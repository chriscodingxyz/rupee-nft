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
    <div className="flex justify-between items-center" id="searchsection">
      <div className="border-2 border-black text-white flex items-center">
        <i className="las la-search ml-3"></i>
        <input
          className="bg-black border-2 rounded border-gray-300 ml-3 w-full"
          placeholder="...search"
          type="text"
          style={{ width: "100%" }}
          onChange={handleInputChange}
        />
      </div>

      <div className=" border-white border-2 border-black">
        <button
          className={`${timeRange === "24h" ? "bg-red-500 text-white" : ""}`}
          onClick={() => setTimeRange("24h")}
        >
          24h
        </button>
        <button
          className={`${timeRange === "7d" ? "bg-red-500 text-white" : ""}`}
          onClick={() => setTimeRange("7d")}
        >
          7D
        </button>
        <button
          className={`${timeRange === "30d" ? "bg-red-500 text-white" : ""}`}
          onClick={() => setTimeRange("30d")}
        >
          30D
        </button>
        <button
          className={`${timeRange === "90d" ? "bg-red-500 text-white" : ""}`}
          onClick={() => setTimeRange("90d")}
        >
          90D
        </button>
      </div>

      <div className=" border-white border-2 border-black">
        <button
          className={`${currency === "Eth" ? "bg-red-500 text-white" : ""}`}
          onClick={() => setCurrency("Eth")}
        >
          <i className="lab la-ethereum"></i>
        </button>
        <button
          className={`${currency === "Usd" ? "bg-red-500 text-white" : ""}`}
          onClick={() => setCurrency("Usd")}
        >
          <i className="las la-dollar-sign"></i>
        </button>
      </div>
    </div>
  );
}
