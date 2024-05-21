import React from "react";

interface HeaderProps {
  title: string;
  backButton?: React.ReactNode;
  logButton?: React.ReactNode;
}

export default function Header({ title, backButton, logButton }: HeaderProps) {
  return (
    <>
      <div className=" min-h-52 bg-white bg-pokeball-bg bg-right-top bg-no-repeat pl-7 pr-6 pt-14">
        <div className="mb-16 flex flex-row justify-between">
          {backButton && <div className="basis-1/2">{backButton}</div>}
          {logButton && <div className="basis-1/2 text-end">{logButton}</div>}
        </div>

        <h2 className="mb-10 font-Circular text-3xl font-black leading-10 tracking-wide">
          {title}
        </h2>
      </div>
    </>
  );
}
