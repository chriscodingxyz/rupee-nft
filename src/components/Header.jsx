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
          className="animated-fade text-white las la-bars ml-2 cursor-pointer hover:rotate-180"
          onClick={toggleNavigation}
        ></i>
        {showNavigation && (
          <div className="navigation-overlay text-white absolute bg-black w-1/2 h-1/2 p-2 flex justify-center items-center text-center">
            {/* Navigation links go here */}
            {/* <div>NAVIGATION</div> */}

            <ul className="">
              <li>collections</li>
              <li>about</li>
              <li>contact</li>
              {/* Add more navigation links as needed */}
            </ul>
            <i
              onClick={toggleNavigation}
              class="animated-fade absolute text-white las la-times right-0 bottom-0 cursor-pointer hover:rotate-90"
              style={{ fontSize: "2rem" }}
            ></i>
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
