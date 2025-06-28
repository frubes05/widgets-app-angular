import { TestBed } from '@angular/core/testing';
import { PokemonFacade } from './pokemon.facade';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject, take } from 'rxjs';
import { PokemonInformationService } from '@features/pokemon/services/pokemon-information.service';
import { PaginationService } from '@shared/services';
import { PokemonDetails } from '@shared/models';

describe('PokemonFacade', () => {
  let facade: PokemonFacade;

  const mockPokemons: PokemonDetails[] = [
    {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      types: ['grass', 'poison'],
      image: 'bulba.png',
    },
    {
      id: 2,
      name: 'ivysaur',
      height: 10,
      weight: 130,
      types: ['grass', 'poison'],
      image: 'ivy.png',
    },
  ];

  let loadingSubject: BehaviorSubject<boolean>;
  let pageSubject: BehaviorSubject<number>;

  let paginationServiceMock: jasmine.SpyObj<PaginationService>;
  let pokemonInformationServiceMock: jasmine.SpyObj<PokemonInformationService>;
  let locationMock: jasmine.SpyObj<Location>;

  beforeEach(() => {
    loadingSubject = new BehaviorSubject<boolean>(false);
    pageSubject = new BehaviorSubject<number>(1);

    paginationServiceMock = jasmine.createSpyObj<PaginationService>(
      'PaginationService',
      ['setPage'],
      { page$: pageSubject.asObservable() }
    );

    pokemonInformationServiceMock =
      jasmine.createSpyObj<PokemonInformationService>(
        'PokemonInformationService',
        ['getPokemonPage', 'getPokemonDetails'],
        {
          loading$: loadingSubject.asObservable(),
          loadingSubject: loadingSubject,
        }
      );
    pokemonInformationServiceMock.getPokemonPage.and.returnValue(
      of(mockPokemons)
    );
    pokemonInformationServiceMock.getPokemonDetails.and.returnValue(
      of(mockPokemons[0])
    );

    locationMock = jasmine.createSpyObj<Location>('Location', ['back']);

    TestBed.configureTestingModule({
      providers: [
        PokemonFacade,
        { provide: Location, useValue: locationMock },
        { provide: PaginationService, useValue: paginationServiceMock },
        {
          provide: PokemonInformationService,
          useValue: pokemonInformationServiceMock,
        },
        { provide: ActivatedRoute, useValue: {} },
      ],
    });

    facade = TestBed.inject(PokemonFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should emit loading$ from the information service', (done) => {
    facade.loading$.subscribe((loading) => {
      expect(loading).toBe(false);
      done();
    });
  });

  it('should emit pokemons$ based on current page and toggle loading states', (done) => {
    const loadingSpy = spyOn(loadingSubject, 'next').and.callThrough();

    facade.pokemons$.pipe(take(1)).subscribe((pokemons) => {
      expect(pokemons).toEqual(mockPokemons);
      expect(loadingSpy).toHaveBeenCalledWith(true);
      expect(loadingSpy).toHaveBeenCalledWith(false);
      done();
    });

    pageSubject.next(1);
  });

  it('should call setPage when loadPokemons is triggered', () => {
    facade.loadPokemons(3);
    expect(paginationServiceMock.setPage).toHaveBeenCalledWith(3);
  });

  it('should return observable from getPokemon$', (done) => {
    facade.getPokemon$('bulbasaur').subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemons[0]);
      expect(
        pokemonInformationServiceMock.getPokemonDetails
      ).toHaveBeenCalledWith('bulbasaur');
      done();
    });
  });

  it('should call location.back() when goToPokemonsTablePage is called', () => {
    facade.goToPokemonsTablePage();
    expect(locationMock.back).toHaveBeenCalled();
  });
});
