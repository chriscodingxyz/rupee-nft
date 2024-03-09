import React, { useState } from "react";

export default function SearchSection({
  currency,
  setCurrency,
  timeRange,
  setTimeRange,
  searchInput,
  setSearchInput,
}) {
  const [inputShowing, setInputShowing] = useState(false);
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex justify-between items-center" id="searchsection">
      <div className=" flex items-center">
        <i
          onClick={() => {
            setInputShowing((curr) => !curr);
            setSearchInput("");
          }}
          className="las la-search ml-3 cursor-pointer"
        ></i>
        {inputShowing ? (
          <input
            autoFocus
            className="animated-fade  border-2 rounded border-gray-300 ml-3 w-full"
            placeholder="...search"
            type="text"
            value={searchInput}
            style={{ width: "100%" }}
            onChange={handleInputChange}
          />
        ) : null}
      </div>

      <div className="buttons-container rounded">
        <button
          className={`${timeRange === "24h" ? "bg-red-500" : ""}`}
          onClick={() => setTimeRange("24h")}
        >
          24h
        </button>
        <button
          className={`${timeRange === "7d" ? "bg-red-500 " : ""}`}
          onClick={() => setTimeRange("7d")}
        >
          7D
        </button>
        <button
          className={`${timeRange === "30d" ? "bg-red-500 " : ""}`}
          onClick={() => setTimeRange("30d")}
        >
          30D
        </button>
        <button
          className={`${timeRange === "90d" ? "bg-red-500 " : ""}`}
          onClick={() => setTimeRange("90d")}
        >
          90D
        </button>
      </div>

      <div className=" buttons-container rounded">
        <button
          className={`${currency === "Native" ? "bg-red-500 " : ""}`}
          onClick={() => setCurrency("Native")}
        >
          <i className="lab la-ethereum"></i>
        </button>
        <button
          className={`${currency === "Usd" ? "bg-red-500 " : ""}`}
          onClick={() => setCurrency("Usd")}
        >
          <i className="las la-dollar-sign"></i>
        </button>
      </div>
    </div>
  );
}
