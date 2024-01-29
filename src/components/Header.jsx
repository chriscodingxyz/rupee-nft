import React from "react";

export default function Header({ setDark }) {
  return (
    <div className="bg-black flex justify-between items-center">
      <h1 className="text-3xl font-bold text-white mx-auto">
        <a href="">🍒 CHERRY NFT 👾</a>
      </h1>

      <div className="">
        <i
          onClick={() => setDark((curr) => !curr)}
          className="animated-fade glow las la-adjust mr-3 text-white cursor-pointer hover:rotate-180 rounded-full opacity-75 hover:opacity-100"
        ></i>
      </div>
    </div>
  );
}
