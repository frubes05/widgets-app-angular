import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { By } from '@angular/platform-browser';
import { AveragedDataPoint } from '@shared/models';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  const mockData: AveragedDataPoint[] = [
    { time: '2024-06-27T10:00:00Z', value: 42.15 },
    { time: '2024-06-27T11:00:00Z', value: 38.71 },
    { time: '2024-06-27T12:00:00Z', value: 40.90 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent, CommonModule, MatTableModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.data = mockData;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render a table based on input data', () => {
    component.data = [...mockData];
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();

    const headerCells = fixture.debugElement.queryAll(By.css('th'));
    expect(headerCells.length).toBe(2);
    expect(headerCells[0].nativeElement.textContent).toContain('Vrijeme');
    expect(headerCells[1].nativeElement.textContent).toContain('Vrijednost');

    const rows = fixture.debugElement.queryAll(By.css('tr[mat-row]'));
    expect(rows.length).toBe(3);
  });

  it('should not render the table if data is empty', () => {
    component.data = [];
    fixture.detectChanges();

    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeNull();
  });
});
