// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Toaster, toast } from "sonner";

import NftStuff from "./components/NftStuff";
import AppLayout from "./ui/AppLayout";
import About from "./components/About";
import PageNotFound from "./pages/PageNotFound";
// import {
//   favs,
//   nftObj,
//   currency,
//   timeRange,
//   onlyFavs,
//   dark,
//   searchInput,
// } from "./GlobalSignals";
import { effect } from "@preact/signals-react";
import { useEffect } from "react";
import { signal } from "@preact/signals-react";

export const nftObj = signal([]);
export const favs = signal(new Set());
export const currency = signal("Eth");
export const timeRange = signal("24h");
export const onlyFavs = signal(false);
export const searchInput = signal("");
export const dark = signal(false);

function App() {
  // const [nftObj, setNftObj] = useState(null);
  // const [favs, setFavs] = useState(new Set());
  // const [currency, setCurrency] = useState("Eth");
  // const [timeRange, setTimeRange] = useState("24h");
  // const [onlyFavs, setOnlyFavs] = useState(false);
  // const [searchInput, setSearchInput] = useState("");
  // const [dark, setDark] = useState(false);

  async function fetchData() {
    try {
      // console.log("trying to fetch");
      const response = await axios.get("nftData.json");
      // console.log("fetched", response.data);

      const { data } = response;
      nftObj.value = data;
      console.log("updated async???", nftObj.value);

      // console.log("DATA", nftObj.value);
      // console.log("just data", typeof data, data.length, data);
    } catch (error) {
      console.error("Catch error:", error);
    }
  }

  // console.log(
  //   favs.value,
  //   nftObj.value,
  //   currency.value,
  //   timeRange.value,
  //   onlyFavs.value,
  //   dark.value,
  //   searchInput.value
  // );

  useEffect(() => {
    fetchData();
    console.log("fetchded data", nftObj.value);
    console.log("favs", favs.value, onlyFavs.value);
  }, [nftObj.value]);

  // effect(() => {
  //   fetchData();
  //   console.log("fetched data", nftObj.value);
  // });

  return (
    <div className={dark.value ? "dark-theme" : "light-theme"}>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <AppLayout
              // currency={currency}
              // setCurrency={setCurrency}
              // timeRange={timeRange}
              // setTimeRange={setTimeRange}
              // setSearchInput={setSearchInput}
              // searchInput={searchInput}
              // setDark={setDark}
              />
            }
          >
            <Route
              index
              path=""
              element={
                <NftStuff
                // favs={favs}
                // setFavs={setFavs}
                // nftObj={nftObj}
                // setNftObj={setNftObj}
                // currency={currency}
                // timeRange={timeRange}
                // onlyFavs={onlyFavs}
                // setOnlyFavs={setOnlyFavs}
                // dark={dark}
                />
              }
            />
            <Route index path="/about" element={<About />} />
          </Route>
          {
            //anything under here is outside of the applayout
          }
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
