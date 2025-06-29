import { HourlyDataMap } from '@shared/models';

export const normalizeChartData = (data: HourlyDataMap) => {
  return Object.entries(data).map(([time, entries]) => {
    const avg = entries.reduce((sum, e) => sum + e.value, 0) / entries.length;
    return { time, value: parseFloat(avg.toFixed(2)) };
  });
};
