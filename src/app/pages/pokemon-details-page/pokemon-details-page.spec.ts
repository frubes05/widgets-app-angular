import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonDetailsPageComponent } from './pokemon-details-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PokemonFacade } from '@facades/pokemon/pokemon.facade';
import { Location } from '@angular/common';
import { mockPikachuNormalizedData } from '@shared/testing/mocks';

describe('PokemonDetailsPageComponent', () => {
  let fixture: ComponentFixture<PokemonDetailsPageComponent>;
  let component: PokemonDetailsPageComponent;
  let facadeSpy: jasmine.SpyObj<PokemonFacade>;

  beforeEach(async () => {
    facadeSpy = jasmine.createSpyObj('PokemonFacade', ['getPokemon$', 'goToPokemonsTablePage']);
    facadeSpy.getPokemon$.and.returnValue(of(mockPikachuNormalizedData));

    await TestBed.configureTestingModule({
      imports: [PokemonDetailsPageComponent],
      providers: [
        { provide: PokemonFacade, useValue: facadeSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['name', 'pikachu']])),
          },
        },
        {
          provide: Location,
          useValue: { back: jasmine.createSpy('back') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemon details based on route param', (done) => {
    component.pokemon$.subscribe((pokemon) => {
      expect(facadeSpy.getPokemon$).toHaveBeenCalledWith('pikachu');
      expect(pokemon).toEqual(mockPikachuNormalizedData);
      done();
    });
  });

  it('should call facade.goToPokemonsTablePage on goBack()', () => {
    component.goBack();
    expect(facadeSpy.goToPokemonsTablePage).toHaveBeenCalled();
  });
});
