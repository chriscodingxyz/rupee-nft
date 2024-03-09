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

  return (
    <div className="p-4" id="collectionitem">
      <div className="flex">
        <div className="flex-1">
          <img
            style={{ borderWidth: "5px", borderRadius: "50%" }}
            src={`https://nftpricefloor.com/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fcdn.nftpricefloor%2Fprojects%2Fv1%2F${slug}.png%3Fversion%3D6&w=256&q=75`}
            onError={(e) => {
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/200px-SMPTE_Color_Bars.svg.png";
            }}
            alt=""
          />
        </div>
        <div className="flex-1 ">
          <ul>
            {/* <li>project id: {itemStats?.projectId}</li> */}
            <li>
              {itemDetails?.name}{" "}
              <span style={{ fontSize: "10px" }}>({itemStats?.slug})</span>{" "}
            </li>
            <li>Supply: {itemStats?.totalSupply}</li>
            <li>Listed: {itemStats?.listedCount}</li>
            <li>Unique Owners: {itemStats?.totalOwners}</li>
            {/* <li>Updated: {itemStats?.updatedAt}</li> */}
            <li>
              <a
                href={`https://etherscan.io/address/${itemDetails?.contract}`}
                target="_blank"
              >
                {itemDetails?.contract?.slice(0, 3)}...
                {itemDetails?.contract?.slice(-3)}
                <i className="las la-external-link-alt"></i>
              </a>
            </li>
            <li>
              {itemDetails?.socialMedia?.map((platform, index) => (
                <span key={index}>
                  {index > 0 && " "}
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      class={socialsObj[platform.name.split("-").join("")]}
                    ></i>
                    {/* {platform.name} */}
                  </a>
                </span>
              ))}
            </li>
          </ul>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="">
        <ul>
          {/* <li>name: {itemDetails?.name}</li>
          <li>slug: {itemDetails?.slug}</li> */}
          <li>Ranking: {itemDetails?.ranking}</li>
          <li>Released: {itemDetails?.releaseDate}</li>
          <li>Creator: {itemDetails?.creator?.name || "N/A"}</li>
          {/* <li>
            parentCollection: {itemDetails?.parentCollection?.name || "N/A"}
          </li>
          <li>subCollection: {itemDetails?.subCollection?.name || "N/A"}</li> */}
          <li>
            Types:{" "}
            {typeof itemDetails?.types === "string"
              ? itemDetails?.types
              : itemDetails?.types?.join(", ")}
          </li>
          <li>Blockchain: {itemDetails?.blockchain}</li>
          <li>Total Supply: {itemDetails?.totalSupply}</li>

          <li>
            Contract:{" "}
            <a
              href={`https://etherscan.io/address/${itemDetails?.contract}`}
              target="_blank"
            >
              {itemDetails?.contract?.slice(0, 3)}...
              {itemDetails?.contract?.slice(-3)}
              <i className="las la-external-link-alt"></i>
            </a>
          </li>
          <li>Floor (eth): {itemDetails?.floorPriceEth || "N/A"}</li>
          <li>Floor (usd): {itemDetails?.floorPriceUsd || "N/A"}</li>
          <li>
            Marketplaces:
            {itemDetails?.marketplaces?.map((marketplace, index) => (
              <span key={index}>
                {index > 0 && ", "}
                <a
                  href={marketplace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={marketsObj[marketplace.name]}
                    alt={marketplace.name}
                    title={marketplace.name}
                  />
                  <i class="las la-external-link-alt"></i>
                </a>
              </span>
            ))}
          </li>
          {itemDetails?.bestPriceUrl ? (
            <li>
              <a href={itemDetails?.bestPriceUrl} target="_blank">
                Lowest Priced URL <i class="las la-external-link-alt"></i>
              </a>
            </li>
          ) : null}

          {/* <li>Creator fee: {itemDetails?.creatorsFee || "N/A"}</li>
          <li>
            Creator fee payout address:{" "}
            {itemDetails?.creatorsFeePayoutAddress || "N/A"}
          </li> */}
          {itemDetails?.mintPriceEth && itemDetails?.mintPriceUsd ? (
            <>
              <li>Mint Price (eth): itemDetails?.mintPriceEth</li>
              <li>Mint Price (usd): itemDetails?.mintPriceUsd</li>
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
