import Header from "~/components/UI/Header";
import BackButton from "~/components/UI/BackButton";
import LogButton from "~/components/UI/LogButton";

import listPokemon from "~/api/pokeapi/getListPokemon";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { getConnectedUser } from "~/utils/db.sessions";
import Card from "./Card";
import clsx from "clsx";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const isConnect = await getConnectedUser(request);

  const url = new URL(request.url);
  let offset = 0;
  let isFirstPage = true;

  if (url.search !== "") {
    const limitTo = url.searchParams.get("OffsetTo");
    offset = Number(limitTo);
    isFirstPage = false;
  }

  if (url.searchParams.get("OffsetTo") === "0") {
    url.searchParams.delete("OffsetTo");
    return redirect(url.toString());
  }

  const pokemons = await listPokemon(offset, 20);
  return json({ isConnect, pokemons, isFirstPage, offset });
};

export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const offset = Number(url.searchParams.get("OffsetTo"));

  const formData = await request.formData();
  const _action = formData.get("action");

  if (url.search !== "") {
    if (_action === "next") {
      return redirect(`/pokedex?OffsetTo=${offset + 20}`);
    }
    if (_action === "previous") {
      return redirect(`/pokedex?OffsetTo=${offset - 20}`);
    }
  } else {
    return redirect("/pokedex?OffsetTo=20");
  }
}

export default function Pokelist() {
  const { pokemons, isConnect, isFirstPage } = useLoaderData<typeof loader>();

  const fetcher = useFetcher();

  const handlePageChange = (action: string) => {
    fetcher.submit({ action }, { method: "POST" });
  };

  return (
    <>
      <section>
        <Header
          title={"Pokedex"}
          backButton={<BackButton />}
          logButton={<LogButton isFav={false} isConnect={!!isConnect} />}
        ></Header>
      </section>
      <section className="h-full bg-white px-7">
        <div className="grid grid-cols-2 gap-3">
          {pokemons.map((pokemon) => (
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
        <div
          className={clsx(
            `py-5`,
            !isFirstPage ? "flex justify-between" : " flex justify-end",
          )}
        >
          {!isFirstPage ? (
            <button
              onClick={() => {
                handlePageChange("previous");
              }}
            >
              Previous
            </button>
          ) : (
            ""
          )}
          <button
            onClick={() => {
              handlePageChange("next");
            }}
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
}
