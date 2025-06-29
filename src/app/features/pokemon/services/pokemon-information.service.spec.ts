import { TestBed } from '@angular/core/testing';
import { PokemonInformationService } from './pokemon-information.service';
import { HttpService } from '@shared/services';
import { of } from 'rxjs';
import { PokemonDetails } from '@shared/models';
import {
  mockBulbasaurApiResponse,
  mockCharizardApiResponse,
  mockPikachuApiResponse,
} from '@shared/testing/mocks';

describe('PokemonInformationService', () => {
  let service: PokemonInformationService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HttpService', ['request']);

    TestBed.configureTestingModule({
      providers: [
        PokemonInformationService,
        { provide: HttpService, useValue: httpServiceSpy },
      ],
    });

    service = TestBed.inject(PokemonInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getPokemonPage', () => {
    it('should fetch a page of pokemon details', (done) => {
      const mockListResponse = {
        results: [
          { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/pikachu' },
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur',
          },
        ],
      };

      httpServiceSpy.request.and.callFake((url: string) => {
        if (url.startsWith('https://pokeapi.co/api/v2/pokemon?')) {
          return of(mockListResponse);
        }
        if (url === 'https://pokeapi.co/api/v2/pokemon/pikachu') {
          return of(mockPikachuApiResponse);
        }
        if (url === 'https://pokeapi.co/api/v2/pokemon/bulbasaur') {
          return of(mockBulbasaurApiResponse);
        }
        return of({}) as any;
      });

      service.getPokemonPage(1).subscribe((results) => {
        expect(results.length).toBe(2);
        expect(results[0]).toEqual({
          id: 25,
          name: 'pikachu',
          height: 4,
          weight: 60,
          types: ['electric'],
          image: 'pikachu.png',
          base_experience: 60,
          abilities: [],
          stats: [],
        });
        expect(results[1]).toEqual({
          id: 1,
          name: 'bulbasaur',
          height: 7,
          weight: 69,
          types: ['grass', 'poison'],
          image: 'bulbasaur.png',
          base_experience: 60,
          abilities: [],
          stats: [],
        });
        done();
      });
    });
  });

  describe('#getPokemonDetails', () => {
    it('should fetch pokemon details by name', (done) => {
      httpServiceSpy.request.and.returnValue(of(mockCharizardApiResponse));

      service
        .getPokemonDetails('charizard')
        .subscribe((details: PokemonDetails) => {
          expect(httpServiceSpy.request).toHaveBeenCalledWith(
            'https://pokeapi.co/api/v2/pokemon/charizard'
          );
          expect(details).toEqual({
            id: 6,
            name: 'charizard',
            height: 17,
            weight: 905,
            types: ['fire', 'flying'],
            image: 'charizard.png',
            base_experience: 60,
            abilities: [],
            stats: [],
          });
          done();
        });
    });
  });
});
