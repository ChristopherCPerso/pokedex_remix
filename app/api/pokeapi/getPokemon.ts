import { PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

export default async function getPokemon(
  params: number,
  isFavorite: boolean | null,
) {
  const pokemonStat = await api.getPokemonById(params);
  const pokemonSpecies = await api.getPokemonSpeciesById(params);

  const fName = pokemonSpecies.names.filter((f) => f.language.name === "fr");
  const name = fName.map((n) => n.name);

  const fGenus = pokemonSpecies.genera.filter((f) => f.language.name === "fr");
  const genus = fGenus.map((g) => g.genus);

  const fFlavor = pokemonSpecies.flavor_text_entries.filter(
    (f) => f.language.name === "fr",
  )[0];
  const flavor_text = fFlavor.flavor_text;

  const pokemon = {
    id: pokemonStat.id,
    name: name,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonStat.id}.png`,
    types: pokemonStat.types.map((t) => t.type.name),
    flavor_text: flavor_text,
    weight: pokemonStat.weight,
    height: pokemonStat.height,
    base_xp: pokemonStat.base_experience,
    stats: pokemonStat.stats,
    gender_rate: pokemonSpecies.gender_rate,
    egg_groups: pokemonSpecies.egg_groups.map((e) => e.name),
    genus: genus,
    habitat: pokemonSpecies.habitat.name,
    prevPokemonImg:
      pokemonStat.id === 1
        ? null
        : `${process.env.IMG_URL}/${pokemonStat.id - 1}.png`,
    nextPokemonImg:
      pokemonStat.id === 1508
        ? null
        : `${process.env.IMG_URL}/${pokemonStat.id + 1}.png`,
    favorite: isFavorite,
  };

  //console.log("STAT POKEMON : ", pokemon);
  return pokemon;
}
