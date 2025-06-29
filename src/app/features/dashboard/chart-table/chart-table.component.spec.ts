import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ChartTableComponent } from './chart-table.component';
import { DashboardFacade } from '@facades/dashboard/dashboard.facade';
import { By } from '@angular/platform-browser';
import { ChartComponent } from '@features/dashboard/chart/chart.component';
import { DataTableComponent } from '@shared/components/data-table/data-table.component';
import { mockChartData, mockDataTableData } from '@shared/testing/mocks';

describe('ChartTableComponent', () => {
  let component: ChartTableComponent;
  let fixture: ComponentFixture<ChartTableComponent>;

  const dashboardFacadeMock = {
    chartDisplayData$: of(mockChartData),
    tableData$: of(mockDataTableData),
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
