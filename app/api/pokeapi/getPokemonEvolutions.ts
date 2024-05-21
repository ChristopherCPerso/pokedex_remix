import { EvolutionClient, PokemonClient } from "pokenode-ts";
import { EvoDetails } from "~/Types/types_poke_evolution";
import { parseLink } from "~/utils/request";

//const api = new PokemonClient();
const apiEvo = new EvolutionClient();
const api = new PokemonClient();

export default async function getPokemonEvolution(params: number) {
  const getEvoChainId = await api.getPokemonSpeciesById(params);

  const idChain = parseLink(getEvoChainId.evolution_chain.url);

  const pokemon = await apiEvo.getEvolutionChainById(idChain);

  const evoDetails: EvoDetails = { regular: [] };

  for (const value of pokemon.chain.evolves_to) {
    const object = {
      from: {
        name: pokemon.chain.species.name,
        imagePokemon: `${process.env.IMG_URL}/${parseLink(pokemon.chain.species.url)}.png`,
        id: parseLink(pokemon.chain.species.url),
      },
      to: {
        name: value.species.name,
        imagePokemon: `${process.env.IMG_URL}/${parseLink(value.species.url)}.png`,
        id: parseLink(value.species.url),
      },
      details: value.evolution_details,
    };
    evoDetails.regular.push(object);
  }

  for (const value of pokemon.chain.evolves_to) {
    for (const subValue of value.evolves_to) {
      const subObject = {
        from: {
          name: value.species.name,
          imagePokemon: `${process.env.IMG_URL}/${parseLink(value.species.url)}.png`,
          id: parseLink(value.species.url),
        },
        to: {
          name: subValue.species.name,
          imagePokemon: `${process.env.IMG_URL}/${parseLink(subValue.species.url)}.png`,
          id: parseLink(subValue.species.url),
        },
        details: value.evolution_details,
      };
      evoDetails.regular.push(subObject);
    }
  }

  return evoDetails;
}
