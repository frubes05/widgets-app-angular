import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ChartTableComponent } from './chart-table.component';
import { DashboardFacade } from '@facades/dashboard/dashboard.facade';
import { ChartDisplayData, AveragedDataPoint } from '@shared/models';
import { By } from '@angular/platform-browser';
import { ChartComponent } from '@features/dashboard/chart/chart.component';
import { DataTableComponent } from '@features/dashboard/data-table/data-table.component';

describe('ChartTableComponent', () => {
  let component: ChartTableComponent;
  let fixture: ComponentFixture<ChartTableComponent>;

  const mockChartData: ChartDisplayData = {
    labels: ['Jan', 'Feb'],
    datasets: [
      {
        label: 'Test Data',
        data: [10, 20],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const mockTableData: AveragedDataPoint[] = [
    { time: '2023-01-01T00:00:00', value: 42 },
    { time: '2023-01-02T00:00:00', value: 36 },
  ];

  const dashboardFacadeMock = {
    chartDisplayData$: of(mockChartData),
    tableData$: of(mockTableData),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartTableComponent],
      providers: [{ provide: DashboardFacade, useValue: dashboardFacadeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render ChartComponent with correct data', () => {
    const chart = fixture.debugElement.query(By.directive(ChartComponent));
    expect(chart).toBeTruthy();
  });

  it('should render DataTableComponent with correct data', () => {
    const table = fixture.debugElement.query(By.directive(DataTableComponent));
    expect(table).toBeTruthy();
  });

  it('should bind displayedColumns to table', () => {
    const table = fixture.debugElement.query(By.directive(DataTableComponent));
    expect(table.componentInstance.displayedColumns).toEqual(
      component.displayedColumns
    );
  });
});
