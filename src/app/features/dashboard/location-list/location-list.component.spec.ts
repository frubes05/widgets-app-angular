import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationListComponent } from './location-list.component';
import { By } from '@angular/platform-browser';
import { mockLocationsData } from '@shared/testing/mocks';

describe('LocationListComponent', () => {
  let component: LocationListComponent;
  let fixture: ComponentFixture<LocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationListComponent);
    component = fixture.componentInstance;
    component.locations = mockLocationsData;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render all locations', () => {
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('.location-list__item'));
    expect(items.length).toBe(2);
    expect(items[0].nativeElement.textContent).toContain('Paris');
    expect(items[1].nativeElement.textContent).toContain('Tokyo');
  });

  it('should highlight the selected location', () => {
    component.selectedLocation = mockLocationsData[1];
    fixture.detectChanges();

    const selectedItem = fixture.debugElement.query(By.css('.location-list__item.selected'));
    expect(selectedItem).not.toBeNull();
    expect(selectedItem.nativeElement.textContent).toContain('Tokyo');
  });

  it('should emit location when item is clicked', () => {
    spyOn(component.selectLocation, 'emit');
    fixture.detectChanges();

    const item = fixture.debugElement.queryAll(By.css('.location-list__item'))[1];
    item.triggerEventHandler('click', null);

    expect(component.selectLocation.emit).toHaveBeenCalledOnceWith(mockLocationsData[1]);
  });
});
