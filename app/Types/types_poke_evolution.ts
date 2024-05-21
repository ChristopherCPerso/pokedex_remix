import { EvolutionDetail } from "pokenode-ts";

export interface EvoDetails {
  regular: {
    from: {
      name: string;
      imagePokemon: string;
      id: number;
    };
    to: {
      name: string;
      imagePokemon: string;
      id: number;
    };
    details: EvolutionDetail[];
  }[];
}

export interface EvolutionPokemon {
  baby_trigger_item: null;
  chain: Chain;
  id: number;
}

export interface Chain {
  evolution_details: EvolutionDetail[];
  evolves_to: Chain[];
  is_baby: boolean;
  species: Species;
}

export interface Species {
  name: string;
  url: string;
}

export enum TimeOfDay {
  Day = "day",
  Empty = "",
  Night = "night",
}
