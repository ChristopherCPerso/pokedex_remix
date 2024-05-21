import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import getPokemon from "~/api/pokeapi/getPokemon";
import Header from "../components/UI/HeaderCard";
import colors, { ThemeColors } from "~/utils/colors";
import BackButton from "~/components/UI/BackButton";
import PokemonImg from "../components/UI/PokemonImg";
import NavigationCard from "~/components/UI/navigationCard";
import LogButton from "~/components/UI/LogButton";
import { getConnectedUser } from "~/utils/db.sessions";
import { getUserByEmail } from "~/utils/db.user.action";
import { PrismaClient } from "@prisma/client";
import { toggleFavorite } from "~/utils/db.favorite.action";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const prisma = new PrismaClient();
  const isConnect = await getConnectedUser(request);

  const id = Number(params.id);

  let isFavorite = false;

  if (isConnect) {
    const user = await getUserByEmail(isConnect);
    const checkFavorite = await prisma.user_favorites.findFirst({
      where: {
        pokemon_id: id,
        user_id: user?.id,
      },
    });
    isFavorite = !!checkFavorite;

    const url = new URL(request.url);
    const action = url.searchParams.get("action");
    if (action === "toggleFav") {
      toggleFavorite(user!.id, id);

      url.searchParams.delete("action");
      return redirect(url.toString());
    }
  }
  const pokemon = await getPokemon(id, isFavorite);
  return json({ pokemon, isConnect });
};

export async function action({ params, request }: ActionFunctionArgs) {
  const isConnect = await getConnectedUser(request);

  if (!isConnect) {
    return redirect(
      `/auth/login?RedirectTo=/pokemon/${params.id}/about?action=toggleFav`,
    );
  } else {
    const user = await getUserByEmail(isConnect);
    await toggleFavorite(user!.id, Number(params.id));
  }
  return null;
}

export default function Pokemon() {
  const { pokemon } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const handleClick = () => {
    fetcher.submit({}, { method: "POST" });
  };

  return (
    <>
      <main
        className="h-screen overflow-hidden"
        style={{
          backgroundColor: colors[pokemon.types[0] as ThemeColors],
        }}
      >
        <section>
          <Header
            pokemon={pokemon}
            backButton={<BackButton />}
            logButton={
              <LogButton onClick={handleClick} isFav={pokemon.favorite} />
            }
          />
        </section>
        <section className="relative z-50">
          <PokemonImg pokemon={pokemon} />
        </section>
        <section className="absolute bottom-0 h-1/2 w-full max-w-md rounded-tl-3xl rounded-tr-3xl bg-white px-7 pt-16">
          <NavigationCard />
          <Outlet />
        </section>
      </main>
    </>
  );
}
