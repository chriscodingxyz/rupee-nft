import React from "react";
import {
  favs,
  nftObj,
  currency,
  timeRange,
  onlyFavs,
  dark,
  searchInput,
} from "../App.jsx";

export default function SearchSection(
  {
    // currency,
    // setCurrency,
    // timeRange,
    // setTimeRange,
    // searchInput,
    // setSearchInput,
  }
) {
  const handleInputChange = (e) => {
    searchInput.value = e.target.value;
  };

  return (
    <div className="flex justify-between items-center" id="searchsection">
      <div className="border-2 border-black text-white flex items-center">
        <i className="las la-search ml-3"></i>
        <input
          className="animated-fade bg-black border-2 rounded border-gray-300 ml-3 w-full"
          placeholder="...search"
          type="text"
          style={{ width: "100%" }}
          onChange={handleInputChange}
        />
      </div>

      <div className=" border-white border-2 border-black">
        <button
          className={`${
            timeRange.value === "24h" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => (timeRange.value = "24h")}
        >
          24h
        </button>
        <button
          className={`${
            timeRange.value === "7d" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => (timeRange.value = "7d")}
        >
          7D
        </button>
        <button
          className={`${
            timeRange.value === "30d" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => (timeRange.value = "30d")}
        >
          30D
        </button>
        <button
          className={`${
            timeRange.value === "90d" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => (timeRange.value = "90d")}
        >
          90D
        </button>
      </div>

      <div className=" border-white border-2 border-black">
        <button
          className={`${
            currency.value === "Eth" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => (currency.value = "Eth")}
        >
          <i className="lab la-ethereum"></i>
        </button>
        <button
          className={`${
            currency.value === "Usd" ? "bg-red-500 text-white" : ""
          }`}
          onClick={() => (currency.value = "Usd")}
        >
          <i className="las la-dollar-sign"></i>
        </button>
      </div>
    </div>
  );
}
