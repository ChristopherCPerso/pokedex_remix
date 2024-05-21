import { Form, useLocation, useNavigate } from "@remix-run/react";

interface LogButton {
  onClick?: () => void;
  isFav: boolean;
  isConnect: boolean;
}

export default function LogButton({ onClick, isFav, isConnect }: LogButton) {
  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname.split("/")[1];
  function handleAction() {
    if (path === "pokedex") {
      navigate("/auth/login");
    }
  }

  return (
    <>
      <Form>
        <button
          type="button"
          onClick={() => {
            handleAction();
            onClick && onClick();
          }}
        >
          <img
            src={
              path === "pokedex"
                ? "/profil.svg"
                : isConnect
                  ? "/logout.svg"
                  : isFav
                    ? "/isFav.svg"
                    : "/notFav.svg"
            }
            alt=""
          />
        </button>
      </Form>
    </>
  );
}
