import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getPokemonEvolution from "~/api/pokeapi/getPokemonEvolutions";
import evoTime from "~/utils/evoTime";
import aboutEvo from "~/utils/evoTrigger";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = Number(params.id);

  const pokemon = await getPokemonEvolution(id);
  return json(pokemon);
};

export default function Evolution() {
  const pokemon = useLoaderData<typeof loader>();

  return (
    <>
      {pokemon.regular.map((item) => (
        <section key={item.from.id}>
          <article className="mb-7 grid grid-cols-3 items-center text-center">
            <div key={item.from.id}>
              <div className="mb-2 bg-evo-bg bg-contain bg-center bg-no-repeat">
                <img src={item.from.imagePokemon} alt="" className="mx-auto" />
              </div>

              <div className="capitalize"> {item.from.name} </div>
            </div>

            <div>
              <p>
                <img src="/arrowEvo.svg" alt="" className="mx-auto w-1/4" />
              </p>
              {item.details.map((detail) => (
                <>
                  <p className=" text-sm">{aboutEvo(detail)}</p>
                  <p className=" text-sm">{evoTime(detail)}</p>
                </>
              ))}
            </div>

            <div key={item.to.id}>
              <div className="bg-evo-bg bg-contain bg-center bg-no-repeat">
                <img src={item.to.imagePokemon} alt="" className="mx-auto" />
              </div>

              <div className="capitalize">{item.to.name}</div>
            </div>
          </article>
        </section>
      ))}
    </>
  );
}
