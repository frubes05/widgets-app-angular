import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChartService } from './chart.service';
import { HttpService } from '@shared/services';
import { HourlyDataMap } from '@shared/models';
import { firstValueFrom } from 'rxjs';

describe('ChartService', () => {
  let service: ChartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChartService, HttpService],
    });

    service = TestBed.inject(ChartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return averaged hourly data points', async () => {
    const mockHourlyData: HourlyDataMap = {
      '2025-06-27T08:00:00Z': [
        { timestampStart: '2025-06-27T08:00:00Z', timestampEnd: '2025-06-27T08:59:59Z', value: 10 },
        { timestampStart: '2025-06-27T08:15:00Z', timestampEnd: '2025-06-27T08:29:59Z', value: 20 },
        { timestampStart: '2025-06-27T08:45:00Z', timestampEnd: '2025-06-27T08:59:59Z', value: 30 },
      ],
      '2025-06-27T09:00:00Z': [
        { timestampStart: '2025-06-27T09:00:00Z', timestampEnd: '2025-06-27T09:59:59Z', value: 15 },
        { timestampStart: '2025-06-27T09:30:00Z', timestampEnd: '2025-06-27T09:59:59Z', value: 25 },
      ],
    };

    const obs$ = service.getHourlyAveragedData();
    const resultPromise = firstValueFrom(obs$);

    httpMock.expectOne('assets/timesheet/data.json').flush(mockHourlyData);

    const result = await resultPromise;

    expect(result).toEqual([
      { time: '2025-06-27T08:00:00Z', value: 20.0 },
      { time: '2025-06-27T09:00:00Z', value: 20.0 },
    ]);
  });
});
