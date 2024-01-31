import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
      style={{ minHeight: "100vh" }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-gray-600 mt-4">
          Sorry, the page you're looking for does not exist.
        </p>
        <div className="mt-4">
          <img className="h-1/4 w-1/4 mx-auto" src="thisisfine.jpg" alt="" />
          <button
            className="mt-4 text-blue-500 underline"
            onClick={() => navigate(-1)}
          >
            {"<<< Go Back"}
          </button>
        </div>
      </div>
    </div>
  );
}
