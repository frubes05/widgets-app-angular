import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapLocationPanelComponent } from './map-location-panel.component';
import { DashboardFacade } from '@facades/dashboard/dashboard.facade';
import { of } from 'rxjs';
import { LocationModel } from '@shared/models';
import { DatePipe } from '@angular/common';
import { mockLocationsData } from '@shared/testing/mocks';

describe('MapLocationPanelComponent', () => {
  let component: MapLocationPanelComponent;
  let fixture: ComponentFixture<MapLocationPanelComponent>;
  let facadeSpy: jasmine.SpyObj<DashboardFacade>;

  const mockLocations = mockLocationsData;
  const selectedLocation = mockLocationsData[1];

  beforeEach(async () => {
    facadeSpy = jasmine.createSpyObj(
      'DashboardFacade',
      ['selectLocation', 'updateMapLocation', 'initMap'],
      {
        locations$: of(mockLocations),
        selectedLocation$: of(selectedLocation),
      }
    );

    await TestBed.configureTestingModule({
      imports: [MapLocationPanelComponent],
      providers: [{ provide: DashboardFacade, useValue: facadeSpy }, DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(MapLocationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose locations$ from facade', (done) => {
    component.locations.subscribe((locations) => {
      expect(locations).toEqual(mockLocations);
      done();
    });
  });

  it('should expose selectedLocation$ from facade', (done) => {
    component.selectedLocation.subscribe((selected) => {
      expect(selected).toEqual(selectedLocation);
      done();
    });
  });

  it('should call facade.selectLocation when onLocationSelect is called', () => {
    const location: LocationModel = { name: 'Tokyo', lat: 35.6895, lng: 139.6917 };

    component.onLocationSelect(location);

    expect(facadeSpy.selectLocation).toHaveBeenCalledWith(location);
  });
});
