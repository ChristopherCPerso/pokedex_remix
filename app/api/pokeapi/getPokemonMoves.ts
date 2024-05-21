import { MoveClient, PokemonClient } from "pokenode-ts";

const api = new PokemonClient();
const apiMove = new MoveClient();

export default async function getPokemonMoves(params: number) {
  const pokemon = await api.getPokemonById(params);
  const movesName = await Promise.all(
    pokemon.moves.map((m) => {
      return apiMove.getMoveByName(m.move.name);
    }),
  );

  const moves = movesName.map((m) => {
    return {
      id: m.id,
      name: m.name,
      pp: m.pp,
      power: m.power,
      type: m.type,
    };
  });

  return moves;
}
