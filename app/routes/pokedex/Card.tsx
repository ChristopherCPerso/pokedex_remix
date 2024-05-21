import { Link } from "@remix-run/react";
import colors, { ThemeColors } from "../../utils/colors";

interface CardProps {
  id: number;
  name: string;
  color: string;
  img: string;
  types: string[];
}

export default function Card({ id, name, img, types }: CardProps) {
  return (
    <>
      <Link to={`/pokemon/${id}/about`}>
        <div
          className={`font-Circular mb-4 min-w-fit rounded-2xl bg-ballcard-bg bg-right-bottom bg-no-repeat px-4 py-2 shadow-2xl`}
          style={{
            backgroundColor: colors[types[0] as ThemeColors],
          }}
        >
          <p className="font-Circular mr-2 text-end text-sm font-bold text-slate-900 text-opacity-60 mix-blend-darken">
            #{id.toString().padStart(3, "0")}
          </p>
          <p className="text-md capitalize text-white">{name}</p>

          <div className="grid grid-cols-2">
            <div>
              {types.map((name) => (
                <div
                  className="mb-2 h-fit w-fit rounded-xl bg-white/40 px-1 text-sm text-white"
                  key={name}
                >
                  {name}
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <img src={img} className="w-28" alt={name} />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
