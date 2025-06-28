import { inject, Injectable } from '@angular/core';
import { HttpService } from '@shared/services';
import { Observable, shareReplay } from 'rxjs';
import { LocationModel } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private readonly httpService = inject(HttpService);

  getLocations(): Observable<LocationModel[]> {
    return this.httpService
      .request<LocationModel[]>('assets/locations/data.json')
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
}