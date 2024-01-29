import React, { useState } from "react";

export default function Header({ setDark }) {
  const [showNavigation, setShowNavigation] = useState(false);

  const toggleNavigation = () => {
    setShowNavigation((prevState) => !prevState);
  };

  return (
    <div className="bg-black flex justify-between items-center">
      <div>
        <i
          style={{ fontSize: "2rem" }}
          className="text-white las la-bars ml-2 cursor-pointer"
          onClick={toggleNavigation}
        ></i>
        {showNavigation && (
          <div className="navigation-overlay text-white absolute bg-black w-1/2 h-1/2">
            {/* Navigation links go here */}
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white mx-auto">
          <a href="/">🍒CHERRY NFT👾</a>
        </h1>
      </div>

      <div className="">
        <i
          onClick={() => setDark((curr) => !curr)}
          className="animated-fade glow las la-adjust mr-3 text-white cursor-pointer hover:rotate-180 rounded-full opacity-75 hover:opacity-100"
        ></i>
      </div>
    </div>
  );
}
