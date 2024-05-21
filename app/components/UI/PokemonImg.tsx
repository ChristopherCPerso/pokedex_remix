import { useNavigate } from "@remix-run/react";
import clsx from "clsx";
import { Pokemon } from "~/Types/types_pokemon";

export interface ImgProps {
  pokemon: Pick<
    Pokemon,
    "id" | "img" | "nextPokemonImg" | "prevPokemonImg" | "name"
  >;
}

function BorderPokemon({
  position,
  link,
  idPokemon,
}: {
  position: "left" | "right";
  link: string | null;
  idPokemon: number;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (position === "left") {
      navigate(`/pokemon/${idPokemon - 1}/about`);
    } else {
      navigate(`/pokemon/${idPokemon + 1}/about`);
    }
  };

  return (
    <button
      style={{ backgroundImage: `url(${link})`, backgroundSize: "cover" }}
      aria-label="next pokemon"
      className={clsx(
        `absolute top-10 z-10 h-24 w-24 cursor-pointer opacity-20 mix-blend-multiply brightness-0 contrast-100 grayscale`,
        { "-left-12": position === "left", "-right-10": position === "right" },
      )}
      onClick={handleClick}
    />
  );
}

export default function PokemonImg({ pokemon }: ImgProps) {
  return (
    <>
      <section className=" flex justify-center">
        <BorderPokemon
          position="left"
          link={pokemon.prevPokemonImg}
          idPokemon={pokemon.id}
        />
        <BorderPokemon
          position="right"
          link={pokemon.nextPokemonImg}
          idPokemon={pokemon.id}
        />
        <img src={pokemon.img} alt={pokemon.name[0]} className="w-1/2" />
      </section>
    </>
  );
}
