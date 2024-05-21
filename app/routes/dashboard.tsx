import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import BackButton from "~/components/UI/BackButton";
import Header from "~/components/UI/Header";
import { getPokemonsFavorites } from "~/utils/db.favorite.action";
import { getConnectedUser, logout } from "~/utils/db.sessions";
import { getUserByEmail } from "~/utils/db.user.action";
import { listPokemonFav } from "~/api/pokeapi/getListPokemon";
import Card from "./pokedex/Card";
import LogButton from "~/components/UI/LogButton";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getConnectedUser(request);
  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }
  const info = await getUserByEmail(user);

  const pokemonFavorite = await getPokemonsFavorites(info!.id);

  const favoritesPromises = pokemonFavorite.map(async (f) => {
    return await listPokemonFav(f.pokemon_id);
  });

  // Attendre que toutes les promesses se résolvent
  const favorites = await Promise.all(favoritesPromises);
  favorites.sort((a, b) => a.id - b.id);

  return { user, info, favorites };
}

export async function action({ request }: ActionFunctionArgs) {
  return await logout(request);
}

export default function Dashboard() {
  const { info, favorites, user } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const handleClick = () => {
    fetcher.submit({}, { method: "POST" });
  };

  return (
    <>
      <Header
        title="Dashboard"
        backButton={<BackButton />}
        logButton={
          <LogButton isFav={false} isConnect={!!user} onClick={handleClick} />
        }
      />

      <section className="relative mx-auto mt-10 h-screen space-y-6 rounded-tl-3xl rounded-tr-3xl bg-white px-4 py-8">
        <h2>Hello {info?.username}</h2>
        <h3 className="font-Circular text-xl">Your Favorites</h3>
        <div className="grid grid-cols-2 gap-3">
          {favorites.map((pokemon) => (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              color={pokemon.color}
              img={pokemon.img}
              types={pokemon.types}
            />
          ))}
        </div>
      </section>
    </>
  );
}
