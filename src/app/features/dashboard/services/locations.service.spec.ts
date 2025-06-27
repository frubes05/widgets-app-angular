import { TestBed } from '@angular/core/testing';
import { LocationsService } from './locations.service';
import { HttpService } from '@shared/services';
import { of } from 'rxjs';
import { LocationModel } from '@shared/models';

describe('LocationsService', () => {
  let service: LocationsService;
  let httpServiceMock: jasmine.SpyObj<HttpService>;

  const mockLocations: LocationModel[] = [
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
  ];

  beforeEach(() => {
    httpServiceMock = jasmine.createSpyObj('HttpService', ['request']);

    TestBed.configureTestingModule({
      providers: [
        LocationsService,
        { provide: HttpService, useValue: httpServiceMock }
      ]
    });

    service = TestBed.inject(LocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return location data from HttpService', (done) => {
    httpServiceMock.request.and.returnValue(of(mockLocations));

    service.getLocations().subscribe((locations) => {
      expect(locations).toEqual(mockLocations);
      expect(httpServiceMock.request).toHaveBeenCalledWith('assets/locations/data.json');
      done();
    });
  });

  it('should cache the response', (done) => {
    httpServiceMock.request.and.returnValue(of(mockLocations));

    service.getLocations().subscribe(() => {
      expect(httpServiceMock.request).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
