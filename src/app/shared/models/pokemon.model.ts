interface PokemonApiResponseType {
  slot: number;
  type: { name: string; url: string };
}

interface PokemonApiResponseSprites {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

interface PokemonApiResponseAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: string;
  slot: number;
}

interface PokemonApiResponseStat {
  base_stat: string;
  effort: number;
  stat: { name: string; url: string };
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: Array<PokemonApiResponseType>;
  sprites: PokemonApiResponseSprites;
  abilities: Array<PokemonApiResponseAbility>;
  stats: Array<PokemonApiResponseStat>;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  image: string;
  base_experience: number;
  abilities: string[];
  stats: {
    name: string;
    value: number;
  }[];
}
