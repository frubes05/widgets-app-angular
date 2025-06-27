import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapWidgetComponent } from './map-widget.component';
import { LocationModel } from '@shared/models';
import { DashboardFacade } from '@facades/dashboard/dashboard.facade';
import { ElementRef, SimpleChanges } from '@angular/core';

describe('MapWidgetComponent', () => {
  let component: MapWidgetComponent;
  let fixture: ComponentFixture<MapWidgetComponent>;
  let dashboardFacadeMock: jasmine.SpyObj<DashboardFacade>;

  const mockLocation: LocationModel = {
    name: 'Berlin',
    lat: 52.52,
    lng: 13.405,
  };

  beforeEach(async () => {
    dashboardFacadeMock = jasmine.createSpyObj('DashboardFacade', [
      'initMap',
      'updateMapLocation',
    ]);

    await TestBed.configureTestingModule({
      imports: [MapWidgetComponent],
      providers: [{ provide: DashboardFacade, useValue: dashboardFacadeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(MapWidgetComponent);
    component = fixture.componentInstance;

    const fakeContainer = document.createElement('div');
    component.mapContainer = new ElementRef(fakeContainer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initMap after view init', () => {
    component.location = mockLocation;
    component.ngAfterViewInit();

    expect(dashboardFacadeMock.initMap).toHaveBeenCalledWith(
      component.mapContainer.nativeElement,
      mockLocation
    );
  });

  it('should call updateMapLocation on input change', () => {
    component.location = mockLocation;

    component.ngOnChanges();

    expect(dashboardFacadeMock.updateMapLocation).toHaveBeenCalledWith(mockLocation);
  });
});
