import { Pokemon } from "~/Types/types_pokemon";

export interface HeaderProps {
  pokemon: Pick<Pokemon, "id" | "types" | "genus" | "name">;
  backButton?: React.ReactNode;
  logButton?: React.ReactNode;
}

export default function Header({
  pokemon,
  backButton,
  logButton,
}: HeaderProps) {
  return (
    <>
      <div className="rounded-bl-3xl rounded-br-3xl px-7 pb-16 pt-6 text-white">
        <div className="mb-8 flex flex-row justify-between lg:pb-16">
          {backButton && <div className="basis-1/2">{backButton}</div>}
          {logButton && <div className="basis-1/2 text-end">{logButton}</div>}
        </div>
        <article className="mb-6 grid grid-cols-2 px-7 font-circularstd-black">
          <div>
            <h1 className="capitalize">{pokemon.name}</h1>
          </div>
          <div className="content-center text-end text-xl">
            #{pokemon.id.toString().padStart(3, "0")}
          </div>
        </article>
        <article className="grid grid-cols-2 px-7 text-sm font-thin">
          <div className="grid grid-cols-2 ">
            {pokemon.types.map((type) => (
              <div
                key={type}
                className="mb-2 w-fit rounded-3xl bg-white/40 px-2 py-1 text-sm text-white"
              >
                {type}
              </div>
            ))}
          </div>
          <div className="content-center text-end">{pokemon.genus}</div>
        </article>
      </div>
    </>
  );
}
