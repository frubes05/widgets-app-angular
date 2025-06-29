import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService } from '@shared/services';
import { AveragedDataPoint, HourlyDataMap } from '@shared/models';
import { normalizeChartData } from '@features/dashboard/utils';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private readonly httpService = inject(HttpService);

  getHourlyAveragedData(): Observable<AveragedDataPoint[]> {
    return this.httpService.request<HourlyDataMap>('assets/timesheet/data.json').pipe(
      map(normalizeChartData)
    );
  }
}