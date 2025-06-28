import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPageComponent } from './dashboard-page.component';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardPageComponent', () => {
  let fixture: ComponentFixture<DashboardPageComponent>;
  let component: DashboardPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent, HttpClientTestingModule],
      providers: [DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ChartTableComponent', () => {
    const chart = fixture.debugElement.query(By.css('awa-chart-table'));
    expect(chart).toBeTruthy();
  });

  it('should render MapLocationPanelComponent', () => {
    const map = fixture.debugElement.query(By.css('awa-map-location-panel'));
    expect(map).toBeTruthy();
  });

  it('should contain at least one mat-card', () => {
    const cards = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(cards.length).toBeGreaterThan(0);
  });
});
