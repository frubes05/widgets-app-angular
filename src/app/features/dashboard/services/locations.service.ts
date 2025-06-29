import { inject, Injectable } from '@angular/core';
import { HttpService } from '@shared/services';
import { Observable, shareReplay } from 'rxjs';
import { LocationModel } from '@shared/models';
import { LOCATIONS_ENDPOINT } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private readonly httpService = inject(HttpService);

  getLocations(): Observable<LocationModel[]> {
    return this.httpService
      .request<LocationModel[]>(LOCATIONS_ENDPOINT)
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
}