import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSkeletonsComponent } from './chart-skeletons.component';
import { By } from '@angular/platform-browser';

describe('ChartSkeletonsComponent', () => {
  let component: ChartSkeletonsComponent;
  let fixture: ComponentFixture<ChartSkeletonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartSkeletonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSkeletonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the chart skeleton div', () => {
    const skeletonDiv = fixture.debugElement.query(By.css('.skeleton'));
    expect(skeletonDiv).toBeTruthy();
  });
});
