import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService } from '@shared/services';
import { AveragedDataPoint, HourlyDataMap } from '@shared/models';
import { normalizeChartData } from '@features/dashboard/utils';
import { CHARTS_ENDPOINT } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private readonly httpService = inject(HttpService);

  getHourlyAveragedData(): Observable<AveragedDataPoint[]> {
    return this.httpService.request<HourlyDataMap>(CHARTS_ENDPOINT).pipe(
      map(normalizeChartData)
    );
  }
}