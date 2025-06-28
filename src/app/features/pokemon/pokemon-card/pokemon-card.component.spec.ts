import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { PokemonDetails } from '@shared/models';

describe('CardComponent (no slot projection)', () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let component: PokemonCardComponent;

  const mockPokemon: PokemonDetails = {
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    types: ['electric'],
    image: 'https://example.com/pikachu.png',
    base_experience: 60,
    abilities: [],
    stats: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the card component', () => {
    component.pokemon$ = of(mockPokemon);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the pokemon details when data is available', () => {
    component.pokemon$ = of(mockPokemon);
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.pokemon-detail__title')).nativeElement;
    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    const info = fixture.debugElement.query(By.css('.pokemon-detail__info')).nativeElement;

    expect(title.textContent).toContain('Pikachu');
    expect(img.src).toBe(mockPokemon.image);
    expect(info.textContent).toContain('ID: 25');
    expect(info.textContent).toContain('Height: 4');
    expect(info.textContent).toContain('Weight: 60');
    expect(info.textContent).toContain('Types: electric');
  });

  it('should show skeleton loader if pokemon is null', () => {
    component.pokemon$ = of(null);
    fixture.detectChanges();

    const skeleton = fixture.debugElement.query(By.css('awa-card-skeletons'));
    expect(skeleton).toBeTruthy();
  });
});
