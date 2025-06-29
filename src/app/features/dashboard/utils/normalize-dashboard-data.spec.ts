import { normalizeChartData } from '@features/dashboard/utils';
import { HourlyDataMap, AveragedDataPoint } from '@shared/models';

describe('normalizeDashboardData', () => {
  describe('normalizeChartData', () => {
    it('should return averaged values for each timestamp in the map', () => {
      const input: HourlyDataMap = {
        '2024-06-29T10:00:00Z': [
          {
            timestampStart: '2024-06-29T10:00:00Z',
            timestampEnd: '2024-06-29T10:15:00Z',
            value: 10,
          },
          {
            timestampStart: '2024-06-29T10:15:00Z',
            timestampEnd: '2024-06-29T10:30:00Z',
            value: 20,
          },
          {
            timestampStart: '2024-06-29T10:30:00Z',
            timestampEnd: '2024-06-29T10:45:00Z',
            value: 30,
          },
        ],
        '2024-06-29T11:00:00Z': [
          {
            timestampStart: '2024-06-29T11:00:00Z',
            timestampEnd: '2024-06-29T11:15:00Z',
            value: 40,
          },
          {
            timestampStart: '2024-06-29T11:15:00Z',
            timestampEnd: '2024-06-29T11:30:00Z',
            value: 50,
          },
        ],
      };

      const expected: AveragedDataPoint[] = [
        { time: '2024-06-29T10:00:00Z', value: 20.0 },
        { time: '2024-06-29T11:00:00Z', value: 45.0 },
      ];

      const result = normalizeChartData(input);
      expect(result).toEqual(expected);
    });

    it('should return an empty array when given an empty map', () => {
      const input: HourlyDataMap = {};
      const result = normalizeChartData(input);
      expect(result).toEqual([]);
    });

    it('should handle single entry per timestamp', () => {
      const input: HourlyDataMap = {
        '2024-06-29T12:00:00Z': [
          {
            timestampStart: '2024-06-29T12:00:00Z',
            timestampEnd: '2024-06-29T12:15:00Z',
            value: 77.7777,
          },
        ],
      };

      const expected: AveragedDataPoint[] = [
        { time: '2024-06-29T12:00:00Z', value: 77.78 },
      ];

      const result = normalizeChartData(input);
      expect(result).toEqual(expected);
    });

    it('should round to two decimal places correctly', () => {
      const input: HourlyDataMap = {
        '2024-06-29T13:00:00Z': [
          { timestampStart: '', timestampEnd: '', value: 10 },
          { timestampStart: '', timestampEnd: '', value: 10 },
          { timestampStart: '', timestampEnd: '', value: 10.356 },
        ],
      };

      const result = normalizeChartData(input);
      expect(result[0].value).toBeCloseTo(10.12, 2);
    });
  });
});
