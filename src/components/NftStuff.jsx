import React, { useEffect, useRef, useState } from "react";
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

function scrollToTop() {
  const nftstufftop = document.getElementById("nftstufftop");
  nftstufftop.scrollIntoView({ behavior: "smooth" });
}

export default function NftStuff({
  nftObj,
  // favs,
  // setFavs,
  currency,
  timeRange,
  onlyFavs,
  setOnlyFavs,
  searchInput,
  setSearchInput,
  dark,
  userFavCollections,
  setUserFavCollections,
}) {
  const addFav = (slug, name) => {
    setUserFavCollections((prevFavs) => [...prevFavs, slug]);
    toast(`Added ${name} to ⭐️`);
  };

  const removeFav = (slug, name) => {
    const updatedFavs = userFavCollections.filter((itemToRemove) => {
      return slug !== itemToRemove;
    });
    setUserFavCollections(updatedFavs);
    toast(`Removed ${name} from ⭐️`);
  };

  const filteredNftObj = nftObj
    ? onlyFavs
      ? nftObj.filter((item) => userFavCollections.includes(item.slug))
      : nftObj
    : [];

  const filteredSearchNftObj = filteredNftObj.filter(
    (item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (!nftObj) {
    return (
      <div className="text-center">
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="mt-4">
          <img className="h-1/4 w-1/4 mx-auto" src="thisisfine.jpg" alt="" />
        </div>
        <br />
        <h1 className="text-2xl font-bold">...fetching...</h1>
      </div>
    );
  }

  return (
    <div id="nftstufftop" className="overflow-x-auto cursor-default">
      <div
        className="animated-fade fixed bottom-4 right-4 bg-yellow-400 text-black  rounded-full px-2 py-1 cursor-pointer shadow-md transition duration-200 hover:bg-orange-400 hover:pb-4"
        onClick={scrollToTop}
        title="Scroll Up ^"
        style={{ zIndex: "10000" }}
      >
        <i class="las la-arrow-circle-up"></i>
      </div>
      {filteredSearchNftObj.length > 0 ? (
        <div className="flex flex-grow">
          <div className="flex-none">
            <table className="table-auto ">
              <thead className="">
                <tr>
                  <th className="">#</th>
                  <th
                    onClick={() => {
                      if (!onlyFavs) {
                        if (userFavCollections.length > 0) {
                          setOnlyFavs(true);
                        } else {
                          toast.error("Favorite 1 or more collections first");
                        }
                      } else {
                        setOnlyFavs((curr) => !curr);
                      }
                    }}
                    className="cursor-pointer"
                  >
                    <span style={{ fontSize: "0.5rem" }}>
                      {userFavCollections.length}
                    </span>

                    {onlyFavs ? "⭐️" : "☆"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSearchNftObj
                  .filter((item) => item.ranking <= 420)
                  .sort((a, b) => a.ranking - b.ranking)
                  .map((item, index) => (
                    <tr key={index}>
                      <td
                        className=""
                        style={{
                          paddingRight: "0",
                          borderColor: "transparent",
                        }}
                        //  style={{ borderColor: "transparent" }}
                      >
                        <span>
                          {item.ranking < 10
                            ? `00${item.ranking}`
                            : item.ranking < 100
                            ? `0${item.ranking}`
                            : item.ranking}
                        </span>
                      </td>
                      <td
                        className="  "
                        style={{ padding: "0", borderColor: "transparent" }}
                        // style={{ borderColor: "transparent" }}
                      >
                        <div
                          title="Add to Favorites"
                          className={`flex cursor-pointer fav-star-div`}
                          onClick={() =>
                            userFavCollections.includes(item.slug)
                              ? removeFav(item.slug, item.name)
                              : addFav(item.slug, item.name)
                          }
                        >
                          <button
                            className={
                              userFavCollections.includes(item.slug)
                                ? "selected-star"
                                : ""
                            }
                          >
                            {userFavCollections.includes(item.slug) ? "★" : "☆"}
                          </button>
                          <img
                            className={`w-7 h-7 rounded    ${
                              userFavCollections.includes(item.slug)
                                ? "glow-gold"
                                : ""
                            }`}
                            src={`https://nftpricefloor.com/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fcdn.nftpricefloor%2Fprojects%2Fv1%2F${item.slug}.png%3Fversion%3D6&w=256&q=75`}
                            onError={(e) => {
                              e.target.src =
                                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/200px-SMPTE_Color_Bars.svg.png";
                            }}
                            alt=""
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto flex-grow">
            <table className="table">
              <thead className="">
                <tr>
                  <th className="w-full text-left">NFT</th>
                  <th className="w-20 min-w-20   text-right">
                    {" "}
                    floor
                    {currency === "Eth" ? (
                      <i className="lab la-ethereum"></i>
                    ) : (
                      <i className="las la-dollar-sign"></i>
                    )}
                  </th>
                  {/* <th className="w-20 min-w-20   text-left">USD</th> */}

                  <th className="w-20 min-w-20   text-right">
                    change
                    {/* <span style={{ fontSize: "8px" }}>{timeRange}</span> */}
                  </th>

                  <th className="w-20 min-w-20   text-right">
                    sold
                    {/* <span style={{ fontSize: "8px" }}>{timeRange}</span> */}
                  </th>
                  <th className="w-20 min-w-20   text-right">volume</th>
                  <th className="w-20 min-w-20   text-right">Mcap</th>
                </tr>
              </thead>
              <tbody>
                {filteredSearchNftObj
                  .filter((item) => item.ranking <= 420)
                  .sort((a, b) => a.ranking - b.ranking)
                  .map((item, index) => (
                    <tr
                      key={index}
                      className={
                        dark ? "hover:bg-gray-950" : "hover:bg-gray-100"
                      }
                    >
                      <td
                        className="w-full truncate whitespace-nowrap overflow-hidden px-0"
                        style={{
                          maxWidth: "10rem", // Adjust the max width as needed
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <i className="las la-braille"></i>
                        <span>
                          <a
                            className="hover:underline"
                            href={`https://nftpricefloor.com/${item.slug}`}
                            target="_blank"
                            title={item.name}
                          >
                            {searchInput
                              ? item.name
                                  .split(new RegExp(`(${searchInput})`, "gi"))
                                  .map((part, index) =>
                                    part.toLowerCase() ===
                                    searchInput.toLowerCase() ? (
                                      <span key={index} className="highlight">
                                        {part}
                                      </span>
                                    ) : (
                                      <span key={index}>{part}</span>
                                    )
                                  )
                              : item.name}
                          </a>
                        </span>
                        <div
                          title="Collection size"
                          style={{ fontSize: "8px", color: "gray" }}
                        >
                          ---{item.stats.totalSupply}
                        </div>
                        {/* {item.name === "CryptoPunks" ? (
                          <div className="h-full"></div>
                        ) : null} */}
                      </td>
                      <td
                        className="w-20 min-w-20 text-right"
                        title={`Floor price in $${currency}`}
                      >
                        {currency === "Eth" ? (
                          <>
                            {Number(
                              item.stats.floorInfo.currentFloorEth
                            ).toFixed(1)}
                            <i
                              title={`Floor price in $${currency}`}
                              className="lab la-ethereum"
                            ></i>
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

                      <td
                        title={`$${currency} price % change within ${timeRange}`}
                        className={`w-20 min-w-20  text-right ${
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
                      <td
                        className="w-20 min-w-20 text-right"
                        title={`Items sold within ${timeRange}`}
                      >
                        {item.stats.count[`val${timeRange}`]
                          ? Number(
                              item.stats.count[`val${timeRange}`]
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })
                          : "-"}
                      </td>
                      <td
                        className="w-20 min-w-20  text-right"
                        title={`${timeRange} volume in $${currency}`}
                      >
                        {currency === "Eth" ? (
                          <>
                            {Number(
                              item.stats.salesTemporalityEth.volume[
                                `val${timeRange}`
                              ]
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
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
                      <td
                        className="w-20 min-w-20  text-right"
                        title={`Total Marketcap in $${currency}`}
                      >
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
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="mt-4">
            <img className="h-1/4 w-1/4 mx-auto" src="thisisfine.jpg" alt="" />
          </div>
          <br />
          <h1 className="text-2xl font-bold">No results found</h1>
        </div>
      )}
    </div>
  );
}
