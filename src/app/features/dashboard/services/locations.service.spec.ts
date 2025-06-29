import { TestBed } from '@angular/core/testing';
import { LocationsService } from './locations.service';
import { HttpService } from '@shared/services';
import { of } from 'rxjs';
import { mockLocationsData } from '@shared/testing/mocks';

describe('LocationsService', () => {
  let service: LocationsService;
  let httpServiceMock: jasmine.SpyObj<HttpService>;

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
    httpServiceMock.request.and.returnValue(of(mockLocationsData));

    service.getLocations().subscribe((locations) => {
      expect(locations).toEqual(mockLocationsData);
      expect(httpServiceMock.request).toHaveBeenCalledWith('assets/locations/data.json');
      done();
    });
  });

  it('should cache the response', (done) => {
    httpServiceMock.request.and.returnValue(of(mockLocationsData));

    service.getLocations().subscribe(() => {
      expect(httpServiceMock.request).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
