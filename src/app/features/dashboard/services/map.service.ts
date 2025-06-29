import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { LocationModel } from '@shared/models';
import { LEAFLET_MAP_ENDPOINT, MAP_OPTIONS } from '@shared/constants';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;

  private readonly icon = L.icon(MAP_OPTIONS);

  initMap(container: string | HTMLElement, location: LocationModel): void {
    this.map = L.map(container).setView([location.lat, location.lng], 13);
    L.tileLayer(LEAFLET_MAP_ENDPOINT).addTo(this.map);

    this.marker = L.marker([location.lat, location.lng], { icon: this.icon }).addTo(this.map);
  }

  updateLocation(location: LocationModel): void {
    if (this.map && this.marker) {
      this.marker.setLatLng([location.lat, location.lng]);
      this.map.setView([location.lat, location.lng], 13);
    }
  }
}