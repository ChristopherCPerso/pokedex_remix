import { PokemonClient } from "pokenode-ts";
import { ListPokemon } from "~/Types/types_poke_list";
const api = new PokemonClient();

export default async function listPokemon(
  offset: number,
  limit: number,
): Promise<ListPokemon[]> {
  const allPokemon = await api.listPokemons(offset, limit);

  const pokemonsInfo = allPokemon.results.map(async (p) => {
    const pokemon = await api.getPokemonByName(p.name);
    const species = await api.getPokemonSpeciesByName(p.name);

    const type = pokemon.types.map((t) => {
      return t.type.name;
    });

    //const name = species.names.filter((f)=> f.language.name === "fr")

    const pokemonObject = {
      id: pokemon.id,
      name: pokemon.name,
      color: species.color.name,
      types: type,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
    };

    return pokemonObject;
  });

  const pokemons = await Promise.all(pokemonsInfo);
  return pokemons;
}

export async function listPokemonFav(id: number) {
  const pokemon = await api.getPokemonById(id);

  const pokemonSpecie = pokemon.species.name;

  const pokemonTypes = pokemon.types.map((t) => {
    return t.type.name;
  });

  const species = await api.getPokemonSpeciesByName(pokemonSpecie);

  const pokemonObject = {
    id: pokemon.id,
    name: pokemon.name,
    color: species.color.name,
    types: pokemonTypes,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
  };

  console.log(pokemonObject);
  return pokemonObject;
}
