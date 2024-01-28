import React, { useEffect } from "react";
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
    <div>
      {nftObj ? (
        <div>
          {/* <h1 className="text-3xl font-bold mb-4">NFT Data</h1> */}
          <div className="flex border-6 border border-green-400">
            <div className="flex-none">
              <table className="table-auto bg-orange-100">
                <thead className="sticky top-0 bg-black">
                  <tr>
                    <th className="w-8">⭐️</th>
                    <th className="w-6 "></th>
                  </tr>
                </thead>
                <tbody>
                  {nftObj
                    .filter((item) => item.ranking <= 100)
                    .sort((a, b) => a.ranking - b.ranking)
                    .map((item, index) => (
                      <tr key={index}>
                        <td
                          className="w-8 text-center p-0 cursor-pointer"
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
                        <td className="w-6 text-center p-0">
                          <img
                            className="w-6 h-auto border-black border"
                            src={`https://nftpricefloor.com/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fcdn.nftpricefloor%2Fprojects%2Fv1%2F${item.slug}.png%3Fversion%3D6&w=256&q=75`}
                            onError={(e) => {
                              e.target.src =
                                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/200px-SMPTE_Color_Bars.svg.png"; // Provide your fallback image URL here
                            }}
                            alt=""
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="flex-auto">
              <table className="table-auto">
                <thead className="sticky top-0 bg-black">
                  <tr>
                    <th className="w-32 text-blue-600 text-left sticky top-0">
                      Name
                    </th>
                    <th className="w-32 text-orange-600 text-left sticky top-0">
                      ETH
                    </th>
                    <th className="w-32 text-purple-600 text-left sticky top-0">
                      USD
                    </th>
                    <th className="w-32 text-orange-600 text-left sticky top-0">
                      ETH
                    </th>
                    <th className="w-32 text-purple-600 text-left sticky top-0">
                      USD
                    </th>
                    <th className="w-32 text-orange-600 text-left sticky top-0">
                      ETH
                    </th>
                    <th className="w-32 text-purple-600 text-left sticky top-0">
                      USD
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nftObj
                    .filter((item) => item.ranking <= 100)
                    .sort((a, b) => a.ranking - b.ranking)
                    .map((item, index) => (
                      <tr key={index}>
                        <td className="w-32 truncate ">
                          <i className="las la-braille"></i>
                          <span className="">{item.name}</span>

                          <div style={{ fontSize: "8px", color: "gray" }}>
                            ---{item.stats.totalSupply}
                          </div>
                        </td>
                        <td className="w-32  bg-gray-100">
                          <i className="lab la-ethereum"></i>
                          {item.stats.floorInfo.currentFloorEth}
                        </td>
                        <td className="w-32  bg-gray-200">
                          <i className="las la-dollar-sign"></i>
                          {item.stats.floorInfo.currentFloorUsd.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }
                          )}
                        </td>

                        <td className="w-32  bg-gray-100">
                          <i className="lab la-ethereum"></i>
                          {item.stats.floorInfo.currentFloorEth}
                        </td>
                        <td className="w-32  bg-gray-200">
                          <i className="las la-dollar-sign"></i>
                          {item.stats.floorInfo.currentFloorUsd.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }
                          )}
                        </td>

                        <td className="w-32  bg-gray-100">
                          <i className="lab la-ethereum"></i>
                          {item.stats.floorInfo.currentFloorEth}
                        </td>
                        <td className="w-32  bg-gray-200">
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
        </div>
      ) : (
        <div>There is no object</div>
      )}
    </div>
  );
}
