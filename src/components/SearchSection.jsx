import React from "react";

export default function SearchSection({
  currency,
  setCurrency,
  timeRange,
  setTimeRange,
}) {
  return (
    <div className="flex justify-between " id="searchsection">
      <div className="border-2 border-black bg-black text-white">
        <i className="las la-search"></i>
        <input className="bg-white" type="text" />
      </div>

      <div className="">
        <div className="border-2 border-black">
          <button
            className={`${
              currency === "eth" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setCurrency("eth")}
          >
            <i className="lab la-ethereum"></i>eth
          </button>
          <button
            className={`${
              currency === "usd" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setCurrency("usd")}
          >
            <i className="las la-dollar-sign"></i>usd
          </button>
        </div>
      </div>

      <div className=" flex ">
        <div className="border-2 border-black">
          <button
            className={`${
              timeRange === "24hr" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setTimeRange("24hr")}
          >
            24hr
          </button>
          <button
            className={`${
              timeRange === "3D" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setTimeRange("3D")}
          >
            3D
          </button>
          <button
            className={`${
              timeRange === "7D" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setTimeRange("7D")}
          >
            7D
          </button>
          <button
            className={`${
              timeRange === "14D" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setTimeRange("14D")}
          >
            14D
          </button>
          <button
            className={`${
              timeRange === "30D" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setTimeRange("30D")}
          >
            30D
          </button>
          <button
            className={`${
              timeRange === "90D" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setTimeRange("90D")}
          >
            90D
          </button>
        </div>
      </div>
    </div>
  );
}
