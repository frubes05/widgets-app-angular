import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLocationPanelComponent } from './map-location-panel.component';

describe('MapLocationPanelComponent', () => {
  let component: MapLocationPanelComponent;
  let fixture: ComponentFixture<MapLocationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapLocationPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapLocationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
