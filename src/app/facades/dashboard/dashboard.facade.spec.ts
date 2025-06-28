import { TestBed } from '@angular/core/testing';
import { DashboardFacade } from './dashboard.facade';
import { DatePipe } from '@angular/common';
import { LocationsService } from '@features/dashboard/services/locations.service';
import { ChartService } from '@features/dashboard/services/chart.service';
import { MapService } from '@features/dashboard/services/map.service';
import { of, skip } from 'rxjs';
import { LocationModel, AveragedDataPoint } from '@shared/models';

describe('DashboardFacade', () => {
  let facade: DashboardFacade;
  let locationsService: jasmine.SpyObj<LocationsService>;
  let chartService: jasmine.SpyObj<ChartService>;
  let mapService: jasmine.SpyObj<MapService>;

  const mockLocations: LocationModel[] = [
    { name: 'Berlin', lat: 52.52, lng: 13.405 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  ];

  const mockDataPoints: AveragedDataPoint[] = [
    { time: '2023-01-01T12:00:00Z', value: 10 },
    { time: '2023-01-01T13:00:00Z', value: 15 },
    { time: '2023-01-01T14:00:00Z', value: 20 },
  ];

  beforeEach(() => {
    locationsService = jasmine.createSpyObj('LocationsService', [
      'getLocations',
    ]);
    chartService = jasmine.createSpyObj('ChartService', [
      'getHourlyAveragedData',
    ]);
    mapService = jasmine.createSpyObj('MapService', [
      'initMap',
      'updateLocation',
    ]);

    locationsService.getLocations.and.returnValue(of(mockLocations));
    chartService.getHourlyAveragedData.and.returnValue(of(mockDataPoints));

    TestBed.configureTestingModule({
      providers: [
        DashboardFacade,
        { provide: LocationsService, useValue: locationsService },
        { provide: ChartService, useValue: chartService },
        { provide: MapService, useValue: mapService },
        { provide: DatePipe, useValue: new DatePipe('en-US') },
      ],
    });

    facade = TestBed.inject(DashboardFacade);
  });

  it('should emit locations$', (done) => {
    facade.locations$.subscribe((locations) => {
      expect(locations).toEqual(mockLocations);
      done();
    });
  });

  it('should select default location if no manual selection made', (done) => {
    facade.selectedLocation$.subscribe((loc) => {
      expect(loc).toEqual(mockLocations[0]);
      done();
    });
  });

  it('should select manually selected location', (done) => {
    facade.selectLocation(mockLocations[1]);

    facade.selectedLocation$.pipe(skip(1)).subscribe((loc) => {
      expect(loc).toEqual(mockLocations[1]);
      done();
    });
  });

  it('should emit chart display data formatted for Chart.js', (done) => {
    facade.chartDisplayData$.subscribe((chartData) => {
      expect(chartData.labels.length).toBe(3);
      expect(chartData.datasets.length).toBe(1);
      expect(chartData.datasets[0].label).toBe('Vrijednost');
      expect(chartData.datasets[0].data).toEqual([10, 15, 20]);
      expect(chartData.datasets[0].borderColor).toBeDefined();
      expect(chartData.datasets[0].backgroundColor).toContain('rgba');
      done();
    });
  });

  it('should emit raw table data from chartService', (done) => {
    facade.tableData$.subscribe((data) => {
      expect(data).toEqual(mockDataPoints);
      done();
    });
  });

  it('should call mapService.initMap on initMap()', () => {
    const container = document.createElement('div');
    const location = mockLocations[0];

    facade.initMap(container, location);

    expect(mapService.initMap).toHaveBeenCalledWith(container, location);
  });

  it('should call mapService.updateLocation on updateMapLocation()', () => {
    const location = mockLocations[1];

    facade.updateMapLocation(location);

    expect(mapService.updateLocation).toHaveBeenCalledWith(location);
  });
});
