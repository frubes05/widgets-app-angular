import { PokemonDetails } from "@shared/models";

export const mapToPokemonDetails = (pokemon: any): PokemonDetails => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map((t: any) => t.type.name),
    base_experience: pokemon.base_experience,
    image: pokemon.sprites.other['official-artwork'].front_default,
    abilities: pokemon.abilities.map((a: any) => a.ability.name),
    stats: pokemon.stats.map((s: any) => ({
      name: s.stat.name,
      value: s.base_stat
    }))
  };
}