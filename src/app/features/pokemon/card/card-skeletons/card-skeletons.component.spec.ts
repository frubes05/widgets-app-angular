import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardSkeletonsComponent } from './card-skeletons.component';

describe('CardSkeletonsComponent', () => {
  let component: CardSkeletonsComponent;
  let fixture: ComponentFixture<CardSkeletonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSkeletonsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardSkeletonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the skeleton structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.skeleton') || compiled.querySelector('mat-card')).toBeTruthy();
  });
});
