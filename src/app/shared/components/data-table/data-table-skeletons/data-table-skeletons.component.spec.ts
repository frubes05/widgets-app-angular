import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableSkeletonComponent } from './data-table-skeletons.component';
import { By } from '@angular/platform-browser';

describe('DataTableSkeletonComponent', () => {
  let component: DataTableSkeletonComponent;
  let fixture: ComponentFixture<DataTableSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableSkeletonComponent);
    component = fixture.componentInstance;
  });

  it('should render correct number of skeleton rows and columns', () => {
    component.columns = ['time', 'value'];
    component.rowsLength = 3;

    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tr[mat-row]'));
    expect(rows.length).toBe(3);

    rows.forEach(row => {
      const cells = row.queryAll(By.css('td'));
      expect(cells.length).toBe(2);
    });

    const headerCells = fixture.debugElement.queryAll(By.css('th'));
    expect(headerCells.length).toBe(2);
  });
});
