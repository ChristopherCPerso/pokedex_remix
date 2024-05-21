export interface Pokemon {
  id: number;
  name: string[];
  img: string;
  types: string[];
  flavor_text: string | null;
  weight: number;
  height: number;
  stats: StatsPokemon[];
  gender_rate: number;
  egg_groups: string[];
  genus: string[];
  prevPokemonImg: string | null;
  nextPokemonImg: string | null;
  base_xp: number;
  habitat: string | null;
}
export interface StatsPokemon {
  base_stat: number;
  effort: number;
  stat: Stat;
}

export interface Stat {
  name: string;
  url: string;
}
