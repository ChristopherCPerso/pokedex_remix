import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getPokemon from "~/api/pokeapi/getPokemon";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = Number(params.id);
  const pokemon = await getPokemon(id, null);
  return json({ pokemon });
};

export default function Stats() {
  const { pokemon } = useLoaderData<typeof loader>();

  function getCardColor(stat: string) {
    let color = "";
    switch (stat) {
      case "hp":
      case "defense":
      case "speed":
        color = "bg-fire";
        break;
      case "attack":
      case "special-attack":
      case "special-defense":
        color = "bg-grass";
        break;
      default:
        color = "bg-poison";
        break;
    }
    return color;
  }

  function getStatName(statName: string) {
    switch (statName) {
      case "defense":
        return "Def";
      case "special-attack":
        return "Sp.Atk";
      case "special-defense":
        return "Sp.Def";
      default:
        return statName;
    }
  }

  return (
    <>
      <section>
        <div className="grid grid-cols-4 items-center rounded-xl px-4 py-3">
          {pokemon.stats.map((s, index) => (
            <>
              <div className="mb-3">
                <p className="mb-2 capitalize text-stone-400" key={index}>
                  {getStatName(s.stat.name)}
                </p>
              </div>
              <div className="mb-3">
                <p key={index}>{s.base_stat}</p>
              </div>
              <div className="col-span-2 mb-3">
                <div className="h-1 w-full rounded-2xl bg-neutral-200">
                  <div
                    key={index}
                    className={`h-1 rounded-2xl ${getCardColor(s.stat.name)}`}
                    style={{ width: s.base_stat + "%" }}
                  ></div>
                </div>
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  );
}
