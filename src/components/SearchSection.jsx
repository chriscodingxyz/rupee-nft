import React from "react";

export default function SearchSection({
  currency,
  setCurrency,
  timeRange,
  setTimeRange,
  searchInput,
  setSearchInput,
}) {
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex justify-between" id="searchsection">
      <div className="border-2 border-black text-white">
        {<i className="las la-search"></i>}
        <input
          className="bg-black border-2 rounded border-gray-300 ml-3"
          placeholder="...search"
          type="text"
          onChange={handleInputChange} // Attach onChange event to handle input change
        />
      </div>

      <div className="">
        <div className="border-2 border-black border-2 border-black bg-white p-1">
          <button
            className={`${
              timeRange === "24h" ? "bg-red-500 text-white" : "bg-white"
            }`}
            onClick={() => setTimeRange("24h")}
          >
            24h
          </button>
          {/* <button
            className={`${
              timeRange === "3d" ? "bg-red-500 text-white" : "bg-white"
            }`}
            onClick={() => setTimeRange("3d")}
          >
            3D
          </button> */}
          <button
            className={`${
              timeRange === "7d" ? "bg-red-500 text-white" : "bg-white"
            }`}
            onClick={() => setTimeRange("7d")}
          >
            7D
          </button>
          {/* <button
            className={`${
              timeRange === "14D" ? "bg-red-500 text-white" : "bg-white"
            }`}
            onClick={() => setTimeRange("14D")}
          >
            14D
          </button> */}
          <button
            className={`${
              timeRange === "30d" ? "bg-red-500 text-white" : "bg-white"
            }`}
            onClick={() => setTimeRange("30d")}
          >
            30D
          </button>
          <button
            className={`${
              timeRange === "90d" ? "bg-red-500 text-white" : "bg-white"
            }`}
            onClick={() => setTimeRange("90d")}
          >
            90D
          </button>
        </div>
      </div>

      <div className=" flex ">
        <div className="border-2 border-black bg-white p-1">
          <button
            className={`${
              currency === "Eth" ? "bg-red-500 text-white" : "bg-white"
            }`}
            onClick={() => setCurrency("Eth")}
          >
            <i className="lab la-ethereum"></i>
          </button>
          <button
            className={`${
              currency === "Usd" ? "bg-red-500 text-white" : "bg-white"
            }`}
            onClick={() => setCurrency("Usd")}
          >
            <i className="las la-dollar-sign"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
