import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Header({ setDark }) {
  const [showNavigation, setShowNavigation] = useState(false);

  const navigate = useNavigate();

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
    <div className="flex justify-between items-center">
      <div>
        <i
          style={{ fontSize: "2rem" }}
          className="animated-fade  las la-bars ml-2 cursor-pointer hover:rotate-180"
          onClick={toggleNavigation}
        ></i>
        {showNavigation && (
          <div className="navigation-overlay  absolute w-full h-1/2 p-2 flex justify-center items-center text-center ">
            {/* Navigation links go here */}
            {/* <div>NAVIGATION</div> */}

            <ul className="cursor-pointer ">
              <li
                className="hover:underline"
                onClick={() => {
                  navigate("/");
                  toggleNavigation();
                }}
              >
                collections
              </li>
              <li
                className="hover:underline"
                onClick={() => {
                  navigate("/about");
                  toggleNavigation();
                }}
              >
                about
              </li>
              <li>crypto</li>
              <li></li>
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
                  {/* <a
                    href="https://www.linkedin.com/in/wisniewskichris/"
                    target="_blank"
                    title="LinkedIn"
                  >
                    <i class="lab la-linkedin animated-fade hover:rotate-90 text-xl"></i>
                  </a> */}
                </div>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
            <div className="absolute bottom-0 text-xs">
              *navigation and search still under construction*
            </div>
            <i
              onClick={toggleNavigation}
              class="animated-fade absolute las la-times right-0 bottom-0 cursor-pointer hover:rotate-90"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
        )}
      </div>
      <div>
        <h1
          className="text-3xl font-bold mx-auto hover:text-white "
          style={{ fontFamily: "Silkscreen" }}
        >
          <a href="/">🍒cherry NFT👾</a>
        </h1>
      </div>

      <div className="">
        <i
          style={{ fontSize: "1.2rem" }}
          onClick={() => setDark((curr) => !curr)}
          className="animated-fade glow las la-adjust mr-3  cursor-pointer hover:rotate-180 rounded-full"
        ></i>
      </div>
    </div>
  );
}
