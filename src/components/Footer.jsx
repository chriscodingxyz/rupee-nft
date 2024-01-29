import React, { useState, useEffect } from "react";

export default function Footer() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"
        );
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div className="bg-black text-white">
      <marquee behavior="scroll" direction="left" scrollamount="10">
        {/* Display the fetched prices */}
        {Object.entries(prices).map(([crypto, { usd }]) => (
          <span key={crypto} style={{ display: "inline-block" }}>
            {crypto === "bitcoin" && <i class="fa fa-bitcoin"></i>}
            {crypto === "ethereum" && <i class="lab la-ethereum ml-6"></i>}
            {crypto === "solana" && (
              <img
                className="ml-6"
                style={{ height: "15px", display: "inline-block" }}
                src="/icons8-solana-64.png"
                alt=""
              /> // Solana icon
            )}
            {`:$${usd}`}
          </span>
        ))}
      </marquee>
    </div>
  );
}
