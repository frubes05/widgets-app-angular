import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { By } from '@angular/platform-browser';
import { ChartOptions } from 'chart.js';
import { ChartDisplayData } from '@shared/models';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  const mockChartData: ChartDisplayData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Mock Data',
        data: [10, 20, 30],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const mockChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent]
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
