import { useLocation, useNavigate } from "@remix-run/react";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (path === "dashboard") {
            navigate("/pokedex");
          } else if (path === "pokedex") {
            navigate("/");
          } else {
            navigate(-1);
          }
        }}
      >
        <img src={path === "pokemon" ? "/backW.svg" : "/back.svg"} alt="" />
      </button>
    </>
  );
}
