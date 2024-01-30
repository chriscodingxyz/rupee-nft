import React, { useState, useEffect } from "react";
import {
  favs,
  nftObj,
  currency,
  timeRange,
  onlyFavs,
  dark,
  searchInput,
} from "../App.jsx";

export default function Header({}) {
  const [showNavigation, setShowNavigation] = useState(false);

  //   useEffect(() => {
  //     if (showNavigation) {
  //       setTimeout(() => {
  //         setShowNavigation(false);
  //       }, 5000);
  //     }
  //   }, [showNavigation]);

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
          <div className="navigation-overlay text-white absolute bg-black w-full h-1/2 p-2 flex justify-center items-center text-center ">
            {/* Navigation links go here */}
            {/* <div>NAVIGATION</div> */}

            <ul className="">
              <li>collections</li>

              <li>crypto</li>
              <li>about</li>
              <li>
                contact
                <div>
                  <a href="https://github.com/cherrydub" target="_blank">
                    <i class="lab la-github-square animated-fade hover:rotate-90 text-xl"></i>
                  </a>
                  <a
                    href="mailto:chriscoding@icloud.com"
                    title="chriscoding@icloud.com"
                  >
                    <i class="las la-envelope-square animated-fade hover:rotate-90 text-xl"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/wisniewskichris/"
                    target="_blank"
                    title="LinkedIn"
                  >
                    <i class="lab la-linkedin animated-fade hover:rotate-90 text-xl"></i>
                  </a>
                </div>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
            <div className="absolute bottom-0 text-xs">
              *navigation and search still under construction*
            </div>
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
          style={{ fontSize: "1.2rem" }}
          onClick={() => (dark.value = !dark.value)}
          className="animated-fade glow las la-adjust mr-3 text-white cursor-pointer hover:rotate-180 rounded-full opacity-75 hover:opacity-100"
        ></i>
      </div>
    </div>
  );
}
