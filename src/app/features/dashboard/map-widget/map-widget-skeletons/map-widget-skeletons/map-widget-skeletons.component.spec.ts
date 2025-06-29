import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapWidgetSkeletonsComponent } from './map-widget-skeletons.component';

describe('MapWidgetSkeletonsComponent', () => {
  let component: MapWidgetSkeletonsComponent;
  let fixture: ComponentFixture<MapWidgetSkeletonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapWidgetSkeletonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapWidgetSkeletonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render skeleton template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.skeleton')).toBeTruthy();
  });
});
