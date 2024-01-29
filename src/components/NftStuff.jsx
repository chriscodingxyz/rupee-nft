import React, { useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";

const abbreviateNumber = (value) => {
  const suffixes = ["", "k", "M", "B", "T"];
  let tier = (Math.log10(Math.abs(value)) / 3) | 0;

  if (tier === 0) return value;

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);

  const scaledValue = value / scale;

  return scaledValue.toFixed(1) + suffix;
};

export default function NftStuff({
  nftObj,
  favs,
  setFavs,
  currency,
  timeRange,
  onlyFavs,
  setOnlyFavs,
  searchInput,
}) {
  const addFav = (slug, name) => {
    setFavs((prevFavs) => new Set([...prevFavs, slug]));
    toast(`Added ${name} to ⭐️`);
  };

  const removeFav = (slug, name) => {
    const updatedFavs = new Set(favs);
    updatedFavs.delete(slug);
    setFavs(updatedFavs);
    toast(`Removed ${name} from ⭐️`);
  };

  useEffect(() => {
    console.log("the fav list", favs);
  }, [favs]);

  const filteredNftObj = onlyFavs
    ? nftObj.filter((item) => favs.has(item.slug))
    : nftObj;

  return (
    <div id="nftstufftop" className="overflow-x-auto">
      {filteredNftObj ? (
        <div className="flex flex-grow">
          <div className="flex-none">
            <table className="table-auto bg-black text-white">
              <thead className="bg-black text-white">
                <tr>
                  <th
                    onClick={() => setOnlyFavs((curr) => !curr)}
                    className="w-10 min-w-10 cursor-pointer"
                  >
                    {onlyFavs ? "⭐️" : "☆"}
                  </th>
                  <th className="w-8 min-w-8"></th>
                </tr>
              </thead>
              <tbody>
                {filteredNftObj
                  .filter((item) => item.ranking <= 420)
                  .sort((a, b) => a.ranking - b.ranking)
                  .map((item, index) => (
                    <tr key={index}>
                      <td
                        className="w-10 min-w-10 text-center p-0 cursor-pointer "
                        onClick={() =>
                          favs.has(item.slug)
                            ? removeFav(item.slug, item.name)
                            : addFav(item.slug, item.name)
                        }
                      >
                        <div className="flex">
                          <button className="">
                            {favs.has(item.slug) ? "⭐️" : "☆"}
                          </button>
                          <span>
                            {item.ranking < 10
                              ? `0${item.ranking}`
                              : item.ranking}
                          </span>
                        </div>
                      </td>
                      <td className="w-8 min-w-8 text-center p-0 ">
                        <img
                          className="w-7 h-7 border-white rounded border p-0"
                          src={`https://nftpricefloor.com/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fcdn.nftpricefloor%2Fprojects%2Fv1%2F${item.slug}.png%3Fversion%3D6&w=256&q=75`}
                          onError={(e) => {
                            e.target.src =
                              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/200px-SMPTE_Color_Bars.svg.png";
                          }}
                          alt=""
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto flex-grow">
            <table className="table">
              <thead className="bg-black text-white">
                <tr>
                  <th className="w-full text-left">NFT</th>
                  <th className="w-20 min-w-20 text-white text-right">
                    {" "}
                    floor
                    {currency === "Eth" ? (
                      <i className="lab la-ethereum"></i>
                    ) : (
                      <i className="las la-dollar-sign"></i>
                    )}
                  </th>
                  {/* <th className="w-20 min-w-20 text-white text-left">USD</th> */}
                  <th className="w-20 min-w-20 text-white text-right">Mcap</th>
                  <th className="w-20 min-w-20 text-white text-right">
                    %
                    {/* <span style={{ fontSize: "8px" }}>{timeRange}</span> */}
                  </th>

                  <th className="w-20 min-w-20 text-white text-right">
                    sold
                    {/* <span style={{ fontSize: "8px" }}>{timeRange}</span> */}
                  </th>
                  <th className="w-20 min-w-20 text-white text-right">
                    volume
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredNftObj
                  .filter((item) => item.ranking <= 420)
                  .sort((a, b) => a.ranking - b.ranking)
                  .map((item, index) => (
                    <tr key={index}>
                      <td
                        className="w-full truncate whitespace-nowrap overflow-hidden"
                        style={{
                          maxWidth: "10rem", // Adjust the max width as needed
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <i className="las la-braille"></i>
                        <span>
                          <a
                            className="hover:bg-black hover:text-white"
                            href={`https://nftpricefloor.com/${item.slug}`}
                            target="_blank"
                            title={item.name}
                          >
                            {item.name}
                          </a>
                        </span>
                        <div style={{ fontSize: "8px", color: "gray" }}>
                          ---{item.stats.totalSupply}
                        </div>
                      </td>
                      <td className="w-20 min-w-20 bg-white text-right">
                        {currency === "Eth" ? (
                          <>
                            {Number(
                              item.stats.floorInfo.currentFloorEth
                            ).toFixed(1)}
                            <i className="lab la-ethereum"></i>
                          </>
                        ) : (
                          <>
                            {item.stats.floorInfo.currentFloorUsd.toLocaleString(
                              undefined,
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }
                            )}
                            <i className="las la-dollar-sign"></i>
                          </>
                        )}
                      </td>

                      <td className="w-20 min-w-20 bg-white text-right">
                        {currency === "Eth" ? (
                          <>
                            {Number(item.stats.floorCapEth).toLocaleString()}
                            <i className="lab la-ethereum"></i>
                          </>
                        ) : (
                          <>
                            {abbreviateNumber(
                              Number(item.stats.floorCapUsd).toFixed(0)
                            )}
                            <i className="las la-dollar-sign"></i>
                          </>
                        )}
                      </td>

                      <td
                        className={`w-20 min-w-20 bg-white text-right ${
                          Number(
                            item.stats[`floorTemporality${currency}`][
                              "diff" + timeRange
                            ]
                          ) > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {Number(
                          item.stats[`floorTemporality${currency}`][
                            "diff" + timeRange
                          ]
                        ) > 0
                          ? "+"
                          : ""}
                        {Number(
                          item.stats[`floorTemporality${currency}`][
                            "diff" + timeRange
                          ]
                        ).toFixed(2)}
                        %
                      </td>
                      <td className="w-20 min-w-20 bg-white text-right">
                        {item.stats.count[`val${timeRange}`]
                          ? item.stats.count[`val${timeRange}`]
                          : "-"}
                      </td>
                      <td className="w-20 min-w-20 bg-white text-right">
                        {currency === "Eth" ? (
                          <>
                            {Number(
                              item.stats.salesTemporalityEth.volume[
                                `val${timeRange}`
                              ]
                            ).toLocaleString()}
                            <i className="lab la-ethereum"></i>
                          </>
                        ) : (
                          <>
                            {abbreviateNumber(
                              Number(
                                item.stats.salesTemporalityUsd.volume[
                                  `val${timeRange}`
                                ]
                              ).toFixed(0)
                            )}
                            <i className="las la-dollar-sign"></i>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>Fetching...</div>
      )}
    </div>
  );
}
