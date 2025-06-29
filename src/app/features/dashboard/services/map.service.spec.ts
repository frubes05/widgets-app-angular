import { TestBed } from '@angular/core/testing';
import { MapService } from './map.service';
import * as L from 'leaflet';
import { LocationModel } from '@shared/models';

describe('MapService', () => {
  let service: MapService;

  const location: LocationModel = {
    name: 'Berlin',
    lat: 52.52,
    lng: 13.405,
  };

  let mapSpy: jasmine.SpyObj<L.Map>;
  let markerSpy: jasmine.SpyObj<L.Marker>;
  let tileLayerAddToSpy: jasmine.Spy;

  beforeEach(() => {
    markerSpy = jasmine.createSpyObj('Marker', ['setLatLng', 'addTo']);
    markerSpy.addTo.and.returnValue(markerSpy);

    mapSpy = jasmine.createSpyObj('Map', ['setView']);

    tileLayerAddToSpy = jasmine.createSpy('addTo').and.returnValue(mapSpy);

    spyOn(L, 'map').and.returnValue(mapSpy);
    spyOn(L, 'tileLayer').and.returnValue({ addTo: tileLayerAddToSpy } as any);
    spyOn(L, 'marker').and.returnValue(markerSpy);

    TestBed.configureTestingModule({});
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the map and marker', () => {
    const container = document.createElement('div');

    service.initMap(container, location);

    expect(L.map).toHaveBeenCalledWith(container);
    expect(mapSpy.setView).toHaveBeenCalledWith([location.lat, location.lng], 13);
    expect(L.tileLayer).toHaveBeenCalled();
    expect(L.marker).toHaveBeenCalledWith([location.lat, location.lng], jasmine.any(Object));
    expect(markerSpy.addTo).toHaveBeenCalledTimes(1);
  });

  it('should update marker and map view on location update', () => {
    service['map'] = mapSpy;
    service['marker'] = markerSpy;

    service.updateLocation(location);

    expect(markerSpy.setLatLng).toHaveBeenCalledWith([location.lat, location.lng]);
    expect(mapSpy.setView).toHaveBeenCalledWith([location.lat, location.lng], 13);
  });

  it('should not throw if map or marker is not initialized', () => {
    expect(() => service.updateLocation(location)).not.toThrow();
  });
});
