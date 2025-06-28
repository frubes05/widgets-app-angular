import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardSkeletonsComponent } from './pokemon-card-skeletons.component';

describe('PokemonCardSkeletonsComponent', () => {
  let component: PokemonCardSkeletonsComponent;
  let fixture: ComponentFixture<PokemonCardSkeletonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardSkeletonsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardSkeletonsComponent);
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
