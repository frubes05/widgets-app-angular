import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapWidgetComponent } from './map-widget.component';
import { DashboardFacade } from '@facades/dashboard/dashboard.facade';
import { ElementRef } from '@angular/core';
import { mockLocationsData } from '@shared/testing/mocks';

describe('MapWidgetComponent', () => {
  let component: MapWidgetComponent;
  let fixture: ComponentFixture<MapWidgetComponent>;
  let dashboardFacadeMock: jasmine.SpyObj<DashboardFacade>;

  beforeEach(async () => {
    dashboardFacadeMock = jasmine.createSpyObj('DashboardFacade', ['initMap', 'updateMapLocation']);

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
    component.location = mockLocationsData[0];
    component.ngAfterViewInit();

    expect(dashboardFacadeMock.initMap).toHaveBeenCalledWith(
      component.mapContainer.nativeElement,
      mockLocationsData[0]
    );
  });

  it('should call updateMapLocation on input change', () => {
    component.location = mockLocationsData[0];

    component.ngOnChanges();

    expect(dashboardFacadeMock.updateMapLocation).toHaveBeenCalledWith(mockLocationsData[0]);
  });
});
