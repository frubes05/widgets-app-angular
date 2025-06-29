import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { mockPikachuNormalizedData } from '@shared/testing/mocks';

describe('PokemonCardComponent', () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the pokemon card component', () => {
    component.pokemon$ = of(mockPikachuNormalizedData);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the pokemon details when data is available', () => {
    component.pokemon$ = of(mockPikachuNormalizedData);
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.pokemon-card__title')).nativeElement;
    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    const info = fixture.debugElement.query(By.css('.pokemon-card__info')).nativeElement;

    expect(title.textContent).toContain('Pikachu');
    expect(img.src).toContain(mockPikachuNormalizedData.image);
    expect(info.textContent).toContain('Height:4');
    expect(info.textContent).toContain('Weight:60');
  });

  it('should show skeleton loader if pokemon is null', () => {
    component.pokemon$ = of(null);
    fixture.detectChanges();

    const skeleton = fixture.debugElement.query(By.css('awa-pokemon-card-skeletons'));
    expect(skeleton).toBeTruthy();
  });
});
