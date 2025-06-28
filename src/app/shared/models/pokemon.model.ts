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
