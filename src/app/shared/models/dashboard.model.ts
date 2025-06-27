export interface LocationModel {
  name: string;
  lat: number;
  lng: number;
}

export interface DataPoint {
  timestampStart: string;
  timestampEnd: string;
  value: number;
}

export interface AveragedDataPoint {
  time: string;
  value: number;
}

export interface ChartDisplayData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
  }>;
}

export type HourlyDataMap = {
  [hourTimestamp: string]: DataPoint[];
};