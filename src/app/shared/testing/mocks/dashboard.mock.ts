import { AveragedDataPoint, ChartDisplayData, HourlyDataMap, LocationModel } from '@shared/models';
import { ChartOptions } from 'chart.js';

export const mockDataTableData: AveragedDataPoint[] = [
  { time: '2024-06-27T10:00:00Z', value: 42.15 },
  { time: '2024-06-27T11:00:00Z', value: 38.71 },
  { time: '2024-06-27T12:00:00Z', value: 40.9 },
];

export const mockLocationsData: LocationModel[] = [
  { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
];

export const mockHourlyData: HourlyDataMap = {
  '2025-06-27T08:00:00Z': [
    {
      timestampStart: '2025-06-27T08:00:00Z',
      timestampEnd: '2025-06-27T08:59:59Z',
      value: 10,
    },
    {
      timestampStart: '2025-06-27T08:15:00Z',
      timestampEnd: '2025-06-27T08:29:59Z',
      value: 20,
    },
    {
      timestampStart: '2025-06-27T08:45:00Z',
      timestampEnd: '2025-06-27T08:59:59Z',
      value: 30,
    },
  ],
  '2025-06-27T09:00:00Z': [
    {
      timestampStart: '2025-06-27T09:00:00Z',
      timestampEnd: '2025-06-27T09:59:59Z',
      value: 15,
    },
    {
      timestampStart: '2025-06-27T09:30:00Z',
      timestampEnd: '2025-06-27T09:59:59Z',
      value: 25,
    },
  ],
};

export const mockChartData: ChartDisplayData = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [
    {
      label: 'Mock Data',
      data: [10, 20, 30],
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

export const mockChartOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
    tooltip: { enabled: true },
  },
};
