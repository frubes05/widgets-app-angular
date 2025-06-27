import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonPageComponent } from './pokemon-page.component';
import { PokemonFacade } from '@facades/pokemon/pokemon.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { POKEMON_COLUMNS } from '@shared/constants';

describe('PokemonPageComponent', () => {
  let component: PokemonPageComponent;
  let fixture: ComponentFixture<PokemonPageComponent>;
  let facadeSpy: jasmine.SpyObj<PokemonFacade>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    facadeSpy = jasmine.createSpyObj('PokemonFacade', ['loadPokemons'], {
      pokemons$: of([]),
      loading$: of(false)
    });

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PokemonPageComponent],
      providers: [
        { provide: PokemonFacade, useValue: facadeSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(new Map([['page', '3']]))
          }
        },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemons on init from query params', () => {
    expect(facadeSpy.loadPokemons).toHaveBeenCalledWith(3);
  });

  it('should call facade and navigate on page change', () => {
    component.loadNextPokemonBatch(4);

    expect(routerSpy.navigate).toHaveBeenCalledWith([], {
      queryParams: { page: 4 },
      queryParamsHandling: 'merge',
    });

    expect(facadeSpy.loadPokemons).toHaveBeenCalledWith(4);
  });

  it('should navigate to pokemon details', () => {
    component.goToPokemonDetails('pikachu');

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pokemon', 'pikachu']);
  });

  it('should have correct displayedColumns', () => {
    expect(component.displayedColumns).toEqual(POKEMON_COLUMNS);
  });
});
