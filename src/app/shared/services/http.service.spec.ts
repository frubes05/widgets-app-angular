import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CacheService, ErrorHandlerService } from '@shared/services';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;
  let cacheServiceSpy: jasmine.SpyObj<CacheService>;
  let errorHandlerSpy: jasmine.SpyObj<ErrorHandlerService>;

  beforeEach(() => {
    cacheServiceSpy = jasmine.createSpyObj('CacheService', ['has', 'get', 'set']);
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandlerService', ['handle']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        { provide: CacheService, useValue: cacheServiceSpy },
        { provide: ErrorHandlerService, useValue: errorHandlerSpy }
      ]
    });

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return cached data if available', async () => {
    const url = '/api/data';
    const cachedData = { value: 42 };

    cacheServiceSpy.has.and.returnValue(true);
    cacheServiceSpy.get.and.returnValue(cachedData);

    const result = await service.request<typeof cachedData>(url).toPromise();
    expect(result).toEqual(cachedData);
    expect(cacheServiceSpy.get).toHaveBeenCalledWith(url);
    expect(cacheServiceSpy.set).not.toHaveBeenCalled();
  });

  it('should make HTTP GET request and cache the result if not cached', async () => {
    const url = '/api/data';
    const apiData = { value: 99 };

    cacheServiceSpy.has.and.returnValue(false);

    let response: any;
    service.request<typeof apiData>(url).subscribe(res => (response = res));

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(apiData);

    expect(response).toEqual(apiData);
    expect(cacheServiceSpy.set).toHaveBeenCalledWith(url, apiData);
  });

  it('should handle and rethrow HTTP errors', async () => {
    const url = '/api/error';
    const errorResponse = { status: 500, statusText: 'Internal Server Error' };

    cacheServiceSpy.has.and.returnValue(false);

    let caughtError: any;
    service.request(url).subscribe({
      error: err => (caughtError = err)
    });

    const req = httpMock.expectOne(url);
    req.flush({ message: 'Something broke' }, errorResponse);

    expect(errorHandlerSpy.handle).toHaveBeenCalled();
    expect(caughtError.status).toBe(500);
  });
});
