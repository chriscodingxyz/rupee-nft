import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const nftAPI = import.meta.env.VITE_NFTAPI;

const socialsObj = {
  twitter: "lab la-twitter",
  discord: "lab la-discord",
  website: "lab la-internet-explorer",
};

const marketsObj = {
  blur: "/marketplaceLogos/blurLogo.png",
  discord: "/marketplaceLogos/discordlogo.png",
  etherscan: "/marketplaceLogos/etherscan.png",
  openseapro: "/marketplaceLogos/openseaproLogo.png",
  opensea: "/marketplaceLogos/opensealogo.png",
  twitter: "/marketplaceLogos/twitterLogo.png",
  uniswap: "/marketplaceLogos/uniswapLogo.png",
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
    <div className="p-4" id="collectionitem">
      <div className="flex">
        <div className="flex-1">
          <img
            className="border-4 border-gray-300 rounded-full h-40 w-40"
            src={`https://s3.amazonaws.com/cdn.nftpricefloor/projects/v1/${slug}.png?version=6`}
            onError={(e) => {
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/200px-SMPTE_Color_Bars.svg.png";
            }}
            alt={itemDetails.name}
          />
        </div>
        <div className="flex-1 pl-4">
          <ul className="list-disc pl-5">
            <li>
              <strong>{itemDetails.name}</strong>{" "}
              <span className="text-sm text-gray-500">({itemStats.slug})</span>
            </li>
            <li>Supply: {itemStats.totalSupply}</li>
            <li>Listed: {itemStats.listedCount}</li>
            <li>Unique Owners: {itemStats.totalOwners}</li>
            <li>
              <a
                href={`https://etherscan.io/address/${itemDetails.contract}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {itemDetails.contract.slice(0, 6)}...
                {itemDetails.contract.slice(-4)}
                <i className="las la-external-link-alt ml-1"></i>
              </a>
            </li>
            <li>
              Social Media:
              {itemDetails.socialMedia?.map((platform, index) => (
                <span key={index} className="ml-2">
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    <i
                      className={socialsObj[platform.name.split("-").join("")]}
                    ></i>
                  </a>
                </span>
              ))}
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <ul className="list-disc pl-5">
          <li>Ranking: {itemDetails.ranking}</li>
          <li>Released: {itemDetails.releaseDate}</li>
          <li>Creator: {itemDetails.creator?.name || "N/A"}</li>
          <li>
            Types:{" "}
            {Array.isArray(itemDetails.types)
              ? itemDetails.types.join(", ")
              : itemDetails.types}
          </li>
          <li>Blockchain: {itemDetails.blockchain}</li>
          <li>Total Supply: {itemDetails.totalSupply}</li>
          <li>
            Floor (ETH): {itemStats.floorInfo.currentFloorNative || "N/A"}
          </li>
          <li>Floor (USD): {itemStats.floorInfo.currentFloorUsd || "N/A"}</li>
          {/* <li>
            Marketplaces:
            {itemDetails.marketplaces?.map((marketplace, index) => (
              <span key={index} className="ml-2">
                <a
                  href={marketplace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  <img
                    src={marketsObj[marketplace.name]}
                    alt={marketplace.name}
                    title={marketplace.name}
                    className="inline h-6 w-6 ml-1"
                  />
                  <i className="las la-external-link-alt ml-1"></i>
                </a>
              </span>
            ))}
          </li> */}
          {itemDetails.bestPriceUrl && (
            <li>
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
              <li>Mint Price (ETH): {itemDetails.mintPriceEth}</li>
              <li>Mint Price (USD): {itemDetails.mintPriceUsd}</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
