import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const nftAPI = import.meta.env.VITE_NFTAPI;

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

  return (
    <div className="text-center">
      *** UNDER CONSTRUCTION ***
      <img
        src={`https://nftpricefloor.com/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fcdn.nftpricefloor%2Fprojects%2Fv1%2F${slug}.png%3Fversion%3D6&w=256&q=75`}
        onError={(e) => {
          e.target.src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/200px-SMPTE_Color_Bars.svg.png";
        }}
        alt=""
      />
      STATS:
      <ul>
        <li>project id: {itemStats?.projectId}</li>
        <li>slug: {itemStats?.slug}</li>
        <li>totalSupply: {itemStats?.totalSupply}</li>
        <li>listedCount: {itemStats?.listedCount}</li>
        <li>totalOwners: {itemStats?.totalOwners}</li>
        <li>updatedAt: {itemStats?.updatedAt}</li>
      </ul>
      <br />
      <br />
      <br />
      DETAILS:
      <ul>
        <li>name: {itemDetails?.name}</li>
        <li>slug: {itemDetails?.slug}</li>
        <li>ranking: {itemDetails?.ranking}</li>
        <li>imageBlur: {itemDetails?.imageBlur}</li>
        <li>releaseDate: {itemDetails?.releaseDate}</li>
        <li>creator: {itemDetails?.creator}</li>
        <li>parentCollection: {itemDetails?.parentCollection.name}</li>
        <li>subCollection: {itemDetails?.subCollection.name}</li>
        <li>types: {itemDetails?.types}</li>
        <li>blockchain: {itemDetails?.blockchain}</li>
        <li>totalSupply: {itemDetails?.totalSupply}</li>
        <li>
          socialMedia:
          {itemDetails?.socialMedia?.map((platform, index) => (
            <span key={index}>
              {index > 0 && ", "}{" "}
              {/* Add comma and space for multiple platforms */}
              <a href={platform.url} target="_blank" rel="noopener noreferrer">
                {platform.name}
              </a>
            </span>
          ))}
        </li>
        <li>contract: {itemDetails?.contract}</li>
        {/* <li>textEn: {itemDetails?.textEn}</li>
        <li>textEs: {itemDetails?.textEs}</li> */}
        <li>floorPriceEth: {itemDetails?.floorPriceEth}</li>
        <li>floorPriceUsd: {itemDetails?.floorPriceUsd}</li>
        <li>floorInfo: {itemDetails?.floorInfo.currentFloorEth}</li>
        <li>
          marketplaces:
          {itemDetails?.marketplaces?.map((marketplace, index) => (
            <span key={index}>
              {index > 0 && ", "}{" "}
              {/* Add comma and space for multiple marketplaces */}
              <a
                href={marketplace.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {marketplace.name}
              </a>
            </span>
          ))}
        </li>
        <li>bestPriceUrl: {itemDetails?.bestPriceUrl}</li>
        <li>creatorsFee: {itemDetails?.creatorsFee}</li>
        <li>
          creatorsFeePayoutAddress: {itemDetails?.creatorsFeePayoutAddress}
        </li>
        <li>mintPriceEth: {itemDetails?.mintPriceEth}</li>
        <li>mintPriceUsd: {itemDetails?.mintPriceUsd}</li>
        <li>reservoirCollectionId: {itemDetails?.reservoirCollectionId}</li>
      </ul>
    </div>
  );
}
