import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { By } from '@angular/platform-browser';
import { mockChartData, mockChartOptions } from '@shared/testing/mocks';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.chartData = mockChartData;
    component.chartOptions = mockChartOptions;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render a canvas element for the chart', () => {
    component.chartData = mockChartData;
    component.chartOptions = mockChartOptions;
    fixture.detectChanges();

    const canvas = fixture.debugElement.query(By.css('canvas'));
    expect(canvas).toBeTruthy();
  });

  it('should accept and store chart labels and data', () => {
    component.chartData = mockChartData;
    component.chartOptions = mockChartOptions;
    fixture.detectChanges();

    expect(component.chartData.labels).toEqual(['Jan', 'Feb', 'Mar']);
    expect(component.chartData.datasets[0].data).toEqual([10, 20, 30]);
  });
});
