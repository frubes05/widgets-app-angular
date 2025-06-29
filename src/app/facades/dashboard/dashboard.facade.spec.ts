import { TestBed } from '@angular/core/testing';
import { DashboardFacade } from './dashboard.facade';
import { DatePipe } from '@angular/common';
import { ChartService, MapService, LocationsService } from '@features/dashboard/services';
import { of, skip } from 'rxjs';
import { mockDataTableData, mockLocationsData } from '@shared/testing/mocks';

describe('DashboardFacade', () => {
  let facade: DashboardFacade;
  let locationsService: jasmine.SpyObj<LocationsService>;
  let chartService: jasmine.SpyObj<ChartService>;
  let mapService: jasmine.SpyObj<MapService>;

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

    locationsService.getLocations.and.returnValue(of(mockLocationsData));
    chartService.getHourlyAveragedData.and.returnValue(of(mockDataTableData));

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
      expect(locations).toEqual(mockLocationsData);
      done();
    });
  });

  it('should select default location if no manual selection made', (done) => {
    facade.selectedLocation$.subscribe((loc) => {
      expect(loc).toEqual(mockLocationsData[0]);
      done();
    });
  });

  it('should select manually selected location', (done) => {
    facade.selectLocation(mockLocationsData[1]);

    facade.selectedLocation$.pipe(skip(1)).subscribe((loc) => {
      expect(loc).toEqual(mockLocationsData[1]);
      done();
    });
  });

  it('should emit chart display data formatted for Chart.js', (done) => {
    facade.chartDisplayData$.subscribe((chartData) => {
      expect(chartData.labels.length).toBe(3);
      expect(chartData.datasets.length).toBe(1);
      expect(chartData.datasets[0].label).toBe('Vrijednost');
      expect(chartData.datasets[0].data).toEqual([42.15, 38.71, 40.9]);
      expect(chartData.datasets[0].borderColor).toBeDefined();
      expect(chartData.datasets[0].backgroundColor).toContain('rgba');
      done();
    });
  });

  it('should emit raw table data from chartService', (done) => {
    facade.tableData$.subscribe((data) => {
      expect(data).toEqual(mockDataTableData);
      done();
    });
  });

  it('should call mapService.initMap on initMap()', () => {
    const container = document.createElement('div');
    const location = mockLocationsData[0];

    facade.initMap(container, location);

    expect(mapService.initMap).toHaveBeenCalledWith(container, location);
  });

  it('should call mapService.updateLocation on updateMapLocation()', () => {
    const location = mockLocationsData[1];

    facade.updateMapLocation(location);

    expect(mapService.updateLocation).toHaveBeenCalledWith(location);
  });
});
