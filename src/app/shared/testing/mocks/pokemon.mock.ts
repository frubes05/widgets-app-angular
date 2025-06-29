import { PokemonApiResponse, PokemonDetails } from '@shared/models';

export const mockPikachuApiResponse: PokemonApiResponse = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  base_experience: 60,
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'pikachu.png',
      },
    },
  },
  abilities: [],
  stats: [],
};
export const mockBulbasaurApiResponse: PokemonApiResponse = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 60,
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
    {
      slot: 2,
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/',
      },
    },
  ],
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'bulbasaur.png',
      },
    },
  },
  abilities: [],
  stats: [],
};
export const mockCharizardApiResponse: PokemonApiResponse = {
  id: 6,
  name: 'charizard',
  height: 17,
  weight: 905,
  base_experience: 60,
  types: [
    {
      slot: 1,
      type: {
        name: 'fire',
        url: 'https://pokeapi.co/api/v2/type/10/',
      },
    },
    {
      slot: 2,
      type: {
        name: 'flying',
        url: 'https://pokeapi.co/api/v2/type/3/',
      },
    },
  ],
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'charizard.png',
      },
    },
  },
  abilities: [],
  stats: [],
};


export const mockPikachuNormalizedData: PokemonDetails = {
  name: 'pikachu',
  id: 25,
  types: ['electric'],
  height: 4,
  weight: 60,
  image: 'pikachu.png',
  base_experience: 60,
  abilities: [],
  stats: [],
};
export const mockBulbasaurNormalizedData: PokemonDetails = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  types: ['grass', 'poison'],
  image: 'bulbasaur.png',
  base_experience: 60,
  abilities: [],
  stats: [],
};
export const mockCharizardNormalizedData: PokemonDetails = {
  id: 6,
  name: 'charizard',
  height: 17,
  weight: 905,
  types: ['fire', 'flying'],
  image: 'charizard.png',
  base_experience: 60,
  abilities: [],
  stats: [],
};
