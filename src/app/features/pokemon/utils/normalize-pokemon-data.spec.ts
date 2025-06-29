import { normalizePokemonDetails } from '@features/pokemon/utils';
import { PokemonDetails } from '@shared/models';
import { mockPikachuApiResponse } from '@shared/testing/mocks';

describe('normalizePokemonDetails', () => {
  describe('normalizePokemonDetaills', () => {
    it('should normalize Pokemon API response into PokemonDetails', () => {
      const expected: PokemonDetails = {
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        base_experience: 60,
        types: ['electric'],
        image:
          'pikachu.png',
        abilities: [],
        stats: [],
      };

      const result = normalizePokemonDetails(mockPikachuApiResponse);
      expect(result).toEqual(expected);
    });

    it('should return empty arrays for fields which are missing them', () => {
      const partialInput: any = {
        id: 1,
        name: 'missingno',
        height: 0,
        weight: 0,
        base_experience: 0,
        types: [],
        sprites: {
          other: { 'official-artwork': { front_default: 'img.png' } },
        },
        abilities: [],
        stats: [],
      };

      const result = normalizePokemonDetails(partialInput);

      expect(result.types).toEqual([]);
      expect(result.abilities).toEqual([]);
      expect(result.stats).toEqual([]);
    });

    it('should safely access nested image property', () => {
      const input: any = {
        id: 2,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        base_experience: 64,
        types: [],
        sprites: {
          other: {
            'official-artwork': {
              front_default: 'bulba.png',
            },
          },
        },
        abilities: [],
        stats: [],
      };

      const result = normalizePokemonDetails(input);
      expect(result.image).toBe('bulba.png');
    });
  });
});
