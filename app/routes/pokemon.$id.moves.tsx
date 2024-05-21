import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getPokemonMoves from "~/api/pokeapi/getPokemonMoves";
import colors, { ThemeColors } from "~/utils/colors";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = Number(params.id);

  const pokemon = await getPokemonMoves(id);
  return json(pokemon);
};

export default function Moves() {
  const pokemon = useLoaderData<typeof loader>();

  return (
    <>
      <div className="mt-6 grid min-w-full grid-cols-2 gap-6">
        {pokemon.map((m) => {
          return (
            <div
              className={`w-full rounded-2xl bg-ballcard-bg bg-right-bottom bg-no-repeat p-2 capitalize text-white shadow-xl shadow-gray-400/30`}
              key={m.id}
              style={{
                backgroundColor: colors[m.type.name as ThemeColors],
              }}
            >
              <div className=" grid grid-rows-3">
                <div>{m.name}</div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <p className="rounded-xl bg-white/40 px-1">PP: {m.pp}</p>
                  <p className="rounded-xl bg-white/40 px-1">
                    Power : {m.power == null ? "N/A" : m.power}
                  </p>
                </div>
                <div>Type : {m.type.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
