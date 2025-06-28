import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpService } from '@shared/services';
import { AveragedDataPoint, HourlyDataMap } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private readonly httpService = inject(HttpService);

  getHourlyAveragedData(): Observable<AveragedDataPoint[]> {
    return this.httpService.request<HourlyDataMap>('assets/timesheet/data.json').pipe(
      map((data) => {
        return Object.entries(data).map(([time, entries]) => {
          const avg =
            entries.reduce((sum, e) => sum + e.value, 0) / entries.length;
          return { time, value: parseFloat(avg.toFixed(2)) };
        });
      })
    );
  }
}