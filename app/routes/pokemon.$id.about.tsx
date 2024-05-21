import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getPokemon from "~/api/pokeapi/getPokemon";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = Number(params.id);
  const pokemon = await getPokemon(id);

  return json({ pokemon });
};

export default function About() {
  const { pokemon } = useLoaderData<typeof loader>();

  return (
    <section className="pt-10">
      <article className="mb-10 px-7 text-sm">
        <p className="mb-10">{pokemon.flavor_text}</p>

        <div className="grid grid-cols-2 rounded-xl px-4 py-3 shadow-xl shadow-gray-400/20 drop-shadow-2xl">
          <div>
            <p className="mb-2 text-stone-400">Height</p>
            <p>
              {(pokemon.height / 0.3).toFixed(1)} fts ({pokemon.height * 10} cm)
            </p>
          </div>
          <div>
            <p className="mb-2 text-stone-400">Weight</p>
            <p>
              {((pokemon.weight * 2.205) / 10).toFixed(1)} lbs (
              {pokemon.weight / 10} Kg)
            </p>
          </div>
        </div>
      </article>
      <article>
        <div>
          <h3 className="font-Circular mb-4 text-lg font-semibold">Breeding</h3>

          <div className="mb-6 flex">
            <div className="min-w-24">
              <span className=" text-stone-400">Egg Group</span>
            </div>
            <div>
              {pokemon.egg_groups.map((egg) => (
                <ul key={egg}>
                  <li className="capitalize">{egg}</li>
                </ul>
              ))}
            </div>
          </div>

          <div className="mb-6 flex">
            <div className="min-w-24">
              <span className=" text-stone-400">Base EXP</span>
            </div>

            <div>{pokemon.base_xp}</div>
          </div>

          <div className="flex">
            <div className="min-w-24">
              <span className=" text-stone-400">Habitat</span>
            </div>

            <div>{pokemon.habitat != null ? pokemon.habitat : "N/A"}</div>
          </div>
        </div>
      </article>
    </section>
  );
}
