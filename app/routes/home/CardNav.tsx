import { NavLink } from "@remix-run/react";

interface CardProps {
  /**
   * LE titre du bouton
   */
  title: string;
  /**
   * La couleur du bouton
   */
  color: string;
  // ou color : "bg-red-500 || "bg-amber-200" => Cela contraint color ou couleur associé ici
  /**
   * Lien de redirection
   */
  link: string;
}

export default function CardNav({ link, title, color }: CardProps) {
  return (
    <>
      <NavLink to={`${link}`}>
        <div
          className={`${color} relative z-10 mb-1 overflow-hidden rounded-2xl bg-pokenav-bg bg-cover bg-right bg-no-repeat py-6 ps-4`}
        >
          <p className="text-sm font-bold text-white">{title}</p>
          <div className="absolute -left-3 -top-2 h-8 w-8 rounded-br-3xl bg-white/30"></div>
        </div>
        <div className="relative  mx-auto h-2 w-9/12 bg-slate-500 blur-md"></div>
      </NavLink>
    </>
  );
}
