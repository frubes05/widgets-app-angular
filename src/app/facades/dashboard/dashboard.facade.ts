import { inject, Injectable } from '@angular/core';
import { AveragedDataPoint, ChartDisplayData, LocationModel } from '@shared/models';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, startWith } from 'rxjs/operators';
import { ChartService } from '@features/dashboard/services/chart.service';
import { MapService } from '@features/dashboard/services/map.service';
import { LocationsService } from '@features/dashboard/services/locations.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  private readonly datePipe = inject(DatePipe);
  private readonly locationsService = inject(LocationsService);
  private readonly chartService = inject(ChartService);
  private readonly mapService = inject(MapService);

  private readonly manualSelected$ = new BehaviorSubject<LocationModel | null>(null);

  readonly locations$ = this.locationsService.getLocations().pipe(
    filter((locs): locs is LocationModel[] => !!locs && locs.length > 0),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly selectedLocation$: Observable<LocationModel> = combineLatest([
    this.locations$,
    this.manualSelected$.pipe(startWith(null)),
  ]).pipe(
    map(([locations, manual]) => manual ?? locations[0]),
    distinctUntilChanged((a, b) => a.name === b.name),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  get chartDisplayData$(): Observable<ChartDisplayData> {
    return this.chartService.getHourlyAveragedData().pipe(
      filter((points) => !!points?.length),
      map((points) => ({
        labels: points.map(
          (p) => this.datePipe.transform(p.time, 'dd.MM.yyyy. HH:mm') ?? ''
        ),
        datasets: [
          {
            label: 'Vrijednost',
            data: points.map((p) => p.value),
            borderColor: '#3f51b5',
            backgroundColor: 'rgba(63,81,181,0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      }))
    );
  }

  get tableData$(): Observable<AveragedDataPoint[]> {
    return this.chartService.getHourlyAveragedData();
  }

  initMap(container: string | HTMLElement, location: LocationModel): void {
    this.mapService.initMap(container, location);
  }

  updateMapLocation(location: LocationModel): void {
    this.mapService.updateLocation(location);
  }

  selectLocation(loc: LocationModel): void {
    this.manualSelected$.next(loc);
  }
}