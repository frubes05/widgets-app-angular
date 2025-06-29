import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChartService } from './chart.service';
import { HttpService } from '@shared/services';
import { firstValueFrom } from 'rxjs';
import { mockHourlyData } from '@shared/testing/mocks';

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
