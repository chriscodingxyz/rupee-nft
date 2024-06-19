import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Trophy,
  Calendar,
  Users,
  Package,
  DollarSign,
  Star,
  Globe,
} from "lucide-react";

const nftAPI = import.meta.env.VITE_NFTAPI;

const socialsObj = {
  twitter: "lab la-twitter",
  discord: "lab la-discord",
  website: "lab la-internet-explorer",
};

const marketsObj = {
  blur: "Blur",
  discord: "Discord",
  etherscan: "Etherscan",
  openseapro: "OpenSea Pro",
  opensea: "OpenSea",
  twitter: "Twitter",
  uniswap: "Uniswap",
};

export default function CollectionItem() {
  const [itemStats, setItemStats] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!slug) return;

        const response = await axios.get(
          `https://api.nftpricefloor.com/api/projects/${slug}?qapikey=${nftAPI}`
        );

        const { stats, details } = response.data;

        setItemStats(stats);
        setItemDetails(details);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [slug]);

  if (!itemStats || !itemDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <img
          className="border-4 border-gray-300 rounded-full h-24 w-24 md:h-32 md:w-32 object-cover mr-6"
          src={`https://s3.amazonaws.com/cdn.nftpricefloor/projects/v1/${slug}.png?version=6`}
          onError={(e) => {
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/200px-SMPTE_Color_Bars.svg.png";
          }}
          alt={itemDetails.name}
        />
        <div>
          <h1 className="text-3xl font-bold">{itemDetails.name}</h1>
          <h2 className="text-lg text-gray-600">
            by {itemDetails.creator?.name || "Unknown"} ({itemStats.slug})
          </h2>
          <p className="text-lg flex items-center">
            <Trophy className="mr-2" size={20} />
            Rank #{itemDetails.ranking}
          </p>
          <div className="mt-2 flex space-x-4">
            {itemDetails.socialMedia?.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-2xl"
              >
                <i
                  className={socialsObj[platform.name.split("-").join("")]}
                ></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="section">
          <h3 className="text-2xl font-bold mb-2">Collection Stats</h3>
          <ul className="list-none space-y-1 text-lg">
            <li className="flex items-center justify-between border-b border-gray-200 pb-2 border-dashed">
              <div className="flex items-center">
                <Package className="mr-2" size={20} />
                <strong>Supply:</strong>
              </div>
              <span className="text-sm">{itemStats.totalSupply}</span>
            </li>
            <li className="flex items-center justify-between border-b border-gray-200 pb-2 border-dashed">
              <div className="flex items-center">
                <Package className="mr-2" size={20} />
                <strong>Listed:</strong>
              </div>
              <span className="text-sm">{itemStats.listedCount}</span>
            </li>
            <li className="flex items-center justify-between border-b border-gray-200 pb-2 border-dashed">
              <div className="flex items-center">
                <Users className="mr-2" size={20} />
                <strong>Unique Owners:</strong>
              </div>
              <span className="text-sm">{itemStats.totalOwners}</span>
            </li>
            <li className="flex items-center justify-between border-b border-gray-200 pb-2 border-dashed">
              <div className="flex items-center">
                {/* <DollarSign className="mr-2" size={20} /> */}
                <i className="lab la-ethereum mr-2"></i>
                <strong>Floor (ETH):</strong>
              </div>
              <span className="text-sm">
                <i className="lab la-ethereum"></i>
                {itemStats.floorInfo.currentFloorNative || "N/A"}
              </span>
            </li>
            <li className="flex items-center justify-between border-b border-gray-200 pb-2 border-dashed">
              <div className="flex items-center">
                <DollarSign className="mr-2" size={20} />
                <strong>Floor (USD):</strong>
              </div>
              <span className="text-sm">
                {itemStats.floorInfo.currentFloorUsd
                  ? "$" +
                    Number(itemStats.floorInfo.currentFloorUsd).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }
                    )
                  : "N/A"}
              </span>
            </li>
          </ul>
        </div>
        <div className="section">
          <h3 className="text-2xl font-bold mb-2">Additional Info</h3>
          <ul className="list-none space-y-1 text-lg">
            <li className="flex items-center justify-between border-b border-gray-200 pb-2 border-dashed">
              <div className="flex items-center">
                <Calendar className="mr-2" size={20} />
                <strong>Released:</strong>
              </div>
              <span className="text-sm">{itemDetails.releaseDate}</span>
            </li>
            <li className="flex items-center justify-between border-b border-gray-200 pb-2 border-dashed">
              <div className="flex items-center">
                <Globe className="mr-2" size={20} />
                <strong>Blockchain:</strong>
              </div>
              <span className="text-sm">{itemDetails.blockchain}</span>
            </li>
            <li className="flex items-center justify-between border-b border-gray-200 pb-2 border-dashed">
              <div className="flex items-center">
                <Star className="mr-2" size={20} />
                <strong>Types:</strong>
              </div>
              <span className="text-sm">
                {Array.isArray(itemDetails.types)
                  ? itemDetails.types.join(", ")
                  : itemDetails.types}
              </span>
            </li>
            {itemDetails.bestPriceUrl && (
              <li className="flex items-center justify-between border-b border-gray-200 pb-2 border-dashed">
                <a
                  href={itemDetails.bestPriceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Lowest Priced URL{" "}
                  <i className="las la-external-link-alt ml-1"></i>
                </a>
              </li>
            )}
            {itemDetails.mintPriceEth && itemDetails.mintPriceUsd && (
              <>
                <li className="flex items-center justify-between border-b border-gray-200 pb-2 border-dashed">
                  <div className="flex items-center">
                    <DollarSign className="mr-2" size={20} />
                    <strong>Mint Price (ETH):</strong>
                  </div>
                  <span className="text-sm">{itemDetails.mintPriceEth}</span>
                </li>
                <li className="flex items-center justify-between border-b border-gray-200 pb-2 border-dashed">
                  <div className="flex items-center">
                    <DollarSign className="mr-2" size={20} />
                    <strong>Mint Price (USD):</strong>
                  </div>
                  <span className="text-sm">{itemDetails.mintPriceUsd}</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="section border-t pt-4">
        <h3 className="text-2xl font-bold mb-2">Official Links</h3>
        <div className="flex space-x-4">
          {itemDetails.marketplaces?.map(
            (marketplace, index) =>
              marketsObj[marketplace.name] && (
                <a
                  key={index}
                  href={marketplace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline flex items-center"
                >
                  {marketsObj[marketplace.name]}{" "}
                  <i className="las la-external-link-alt ml-1"></i>
                </a>
              )
          )}
        </div>
      </div>
    </div>
  );
}
