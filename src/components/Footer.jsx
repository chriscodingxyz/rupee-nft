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
    <footer className="">
      <marquee behavior="scroll" direction="left" scrollamount="5">
        {Object.entries(prices).map(([crypto, { usd }]) => (
          <span key={crypto} style={{ display: "inline-block" }}>
            {crypto === "bitcoin" && (
              <i class="fa fa-bitcoin" title="$bitcoin"></i>
            )}
            {crypto === "ethereum" && (
              <i class="lab la-ethereum ml-6" title="$ethereum"></i>
            )}
            {crypto === "solana" && (
              <img
                className="ml-6 sol-icon"
                style={{ height: "15px", display: "inline-block" }}
                src="/icons8-solana-64.png"
                alt=""
                title="$Solana"
              />
            )}
            {` = $${usd.toFixed(0)}`}
          </span>
        ))}
      </marquee>
    </footer>
  );
}
