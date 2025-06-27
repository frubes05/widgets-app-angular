import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { LocationModel } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;

  private readonly icon = L.icon({
    iconUrl: 'assets/leaflet/marker-icon.png',
    iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
    shadowUrl: 'assets/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  initMap(container: string | HTMLElement, location: LocationModel): void {
    this.map = L.map(container).setView([location.lat, location.lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    this.marker = L.marker([location.lat, location.lng], { icon: this.icon }).addTo(this.map);
  }

  updateLocation(location: LocationModel): void {
    if (this.map && this.marker) {
      this.marker.setLatLng([location.lat, location.lng]);
      this.map.setView([location.lat, location.lng], 13);
    }
  }
}