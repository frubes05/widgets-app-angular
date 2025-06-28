import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationListComponent } from './location-list.component';
import { LocationModel } from '@shared/models';
import { By } from '@angular/platform-browser';

describe('LocationListComponent', () => {
  let component: LocationListComponent;
  let fixture: ComponentFixture<LocationListComponent>;

  const mockLocations: LocationModel[] = [
    { name: 'Berlin', lat: 52.52, lng: 13.405 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'Rome', lat: 41.9028, lng: 12.4964 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationListComponent);
    component = fixture.componentInstance;
    component.locations = mockLocations;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render all locations', () => {
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('.location-item'));
    expect(items.length).toBe(3);
    expect(items[0].nativeElement.textContent).toContain('Berlin');
    expect(items[1].nativeElement.textContent).toContain('Paris');
    expect(items[2].nativeElement.textContent).toContain('Rome');
  });

  it('should highlight the selected location', () => {
    component.selectedLocation = mockLocations[1];
    fixture.detectChanges();

    const selectedItem = fixture.debugElement.query(By.css('.location-item.selected'));
    expect(selectedItem).not.toBeNull();
    expect(selectedItem.nativeElement.textContent).toContain('Paris');
  });

  it('should emit location when item is clicked', () => {
    spyOn(component.selectLocation, 'emit');
    fixture.detectChanges();

    const item = fixture.debugElement.queryAll(By.css('.location-item'))[2];
    item.triggerEventHandler('click', null);

    expect(component.selectLocation.emit).toHaveBeenCalledOnceWith(mockLocations[2]);
  });
});
