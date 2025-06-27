import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationListSkeletonsComponent } from './location-list-skeletons.component';
import { By } from '@angular/platform-browser';

describe('LocationListSkeletonsComponent', () => {
  let component: LocationListSkeletonsComponent;
  let fixture: ComponentFixture<LocationListSkeletonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationListSkeletonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationListSkeletonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render skeleton list items', () => {
    const skeletonItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(skeletonItems.length).toBe(10);
  });
});
