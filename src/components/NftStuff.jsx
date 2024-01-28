import React, { useEffect, useRef } from "react";
import { Toaster, toast } from "sonner";

export default function NftStuff({ nftObj, favs, setFavs }) {
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

  return (
    <div id="nftstufftop" className="overflow-x-auto">
      {nftObj ? (
        <div className="flex flex-grow">
          <div className="flex-none">
            <table className="table-auto bg-black text-white">
              <thead className="bg-black text-white">
                <tr>
                  <th className="w-10 min-w-10">⭐️</th>
                  <th className="w-8 min-w-8"></th>
                </tr>
              </thead>
              <tbody>
                {nftObj
                  .filter((item) => item.ranking <= 100)
                  .sort((a, b) => a.ranking - b.ranking)
                  .map((item, index) => (
                    <tr key={index}>
                      <td
                        className="w-10 min-w-10 text-center p-0 cursor-pointer"
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
                      <td className="w-8 min-w-8 text-center p-0">
                        <img
                          className="w-6 h-auto border-white border"
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
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-black text-white">
                <tr>
                  <th className="w-36 min-w-36 text-blue-600 text-left">NFT</th>
                  <th className="w-20 min-w-20 text-orange-600 text-left">
                    ETH
                  </th>
                  <th className="w-20 min-w-20 text-purple-600 text-left">
                    USD
                  </th>
                  <th className="w-20 min-w-20 text-orange-600 text-left">
                    % change
                  </th>
                  <th className="min-w-28 text-purple-600 text-left">USD</th>
                  <th className="min-w-20 text-orange-600 text-left">ETH</th>
                  <th className="min-w-28 text-purple-600 text-left">USD</th>
                </tr>
              </thead>
              <tbody>
                {nftObj
                  .filter((item) => item.ranking <= 100)
                  .sort((a, b) => a.ranking - b.ranking)
                  .map((item, index) => (
                    <tr key={index}>
                      <td className="w-36 min-w-36 truncate">
                        <i className="las la-braille"></i>
                        <span className="">
                          <a
                            className="hover:bg-black hover:text-white"
                            href={`https://nftpricefloor.com/${item.slug}`}
                            target="_blank"
                          >
                            {item.name}
                          </a>
                        </span>
                        <div style={{ fontSize: "8px", color: "gray" }}>
                          ---{item.stats.totalSupply}
                        </div>
                      </td>
                      <td className="w-20 min-w-20 bg-gray-100">
                        <i className="lab la-ethereum"></i>
                        {item.stats.floorInfo.currentFloorEth}
                      </td>
                      <td className="w-20 min-w-20 bg-gray-200">
                        <i className="las la-dollar-sign"></i>
                        {item.stats.floorInfo.currentFloorUsd.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }
                        )}
                      </td>
                      <td className="w-20 min-w-20 bg-gray-100">% change</td>
                      <td className="min-w-28 bg-gray-200">
                        <i className="las la-dollar-sign"></i>
                        {item.stats.floorInfo.currentFloorUsd.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }
                        )}
                      </td>
                      <td className="min-w-20 bg-gray-100">
                        <i className="lab la-ethereum"></i>
                        {item.stats.floorInfo.currentFloorEth}
                      </td>
                      <td className="min-w-28 bg-gray-200">
                        <i className="las la-dollar-sign"></i>
                        {item.stats.floorInfo.currentFloorUsd.toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>There is no object</div>
      )}
    </div>
  );
}
