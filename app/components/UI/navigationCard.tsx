import { matchPath, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type TabType = "about" | "stats" | "evolution" | "moves";

export default function NavigationCard() {
  const [tab, setTab] = useState<TabType>("about");
  const { id } = useParams();
  const location = useLocation();
  const path = location.pathname.split("/")[3] as TabType;

  const isActive = useEffect(() => {
    function matchPath() {
      if (path != tab) {
        setTab(path);
      }
    }
    matchPath();
  }, [path, tab]);

  return (
    <>
      <div className="grid grid-cols-4">
        <Link
          to={`/pokemon/${id}/about`}
          className={`border-b-2 border-gray-100 pb-5 text-center text-stone-300 transition-all duration-300 ease-out hover:border-indigo-400 hover:text-indigo-700 ${tab === "about" ? "border-indigo-300 text-indigo-600" : ""}`}
          onLoad={() => {
            isActive;
          }}
        >
          <button>About</button>
        </Link>

        <Link
          to={`/pokemon/${id}/stats`}
          className={`border-b-2 border-gray-100 pb-5 text-center text-stone-300 transition-all duration-300 ease-out hover:border-indigo-400 hover:text-indigo-700 ${tab === "stats" ? "border-indigo-300 text-indigo-600" : ""}`}
          onLoad={() => {
            isActive;
          }}
        >
          <button>Base Stats</button>
        </Link>
        <Link
          to={`/pokemon/${id}/evolution`}
          className={`border-b-2 border-gray-100 pb-5 text-center text-stone-300 transition-all duration-300 ease-out hover:border-indigo-400 hover:text-indigo-700 ${tab === "evolution" ? "border-indigo-300 text-indigo-600" : ""}`}
          onLoad={() => {
            isActive;
          }}
        >
          <button>Evolution</button>
        </Link>

        <Link
          to={`/pokemon/${id}/moves`}
          className={`border-b-2 border-gray-100 pb-5 text-center text-stone-300 transition-all duration-300 ease-out hover:border-indigo-400 hover:text-indigo-700 ${tab === "moves" ? "border-indigo-300 text-indigo-600" : ""}`}
          onLoad={() => {
            isActive;
          }}
        >
          <button>Moves</button>
        </Link>
      </div>
    </>
  );
}
