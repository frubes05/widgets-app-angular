import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationListSkeletonsComponent } from './location-list-skeletons.component';

describe('LocationListSkeletonsComponent', () => {
  let component: LocationListSkeletonsComponent;
  let fixture: ComponentFixture<LocationListSkeletonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationListSkeletonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationListSkeletonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
