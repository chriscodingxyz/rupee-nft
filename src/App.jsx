import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Toaster, toast } from "sonner";
import { useLocalStorage } from "@uidotdev/usehooks";

import Collections from "./pages/Collections";
import AppLayout from "./ui/AppLayout";
import About from "./components/About";
import PageNotFound from "./pages/PageNotFound";
import CollectionItem from "./components/CollectionItem";
import HomePage from "./pages/HomePage";

function App() {
  const [userFavCollections, setUserFavCollections] = useLocalStorage(
    "userFavCollections",
    []
  );
  const [dark, setDark] = useLocalStorage("dark", false);
  const [nftObj, setNftObj] = useState(null);
  const [currency, setCurrency] = useState("Eth");
  const [timeRange, setTimeRange] = useState("24h");
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const nftApiLink = "nftData.json";
  const nftAPI = import.meta.env.VITE_NFTAPI;

  async function fetchData() {
    try {
      const response = await axios.get(
        `https://nftpricefloor.quickapi.io/api/projects?qapikey=${nftAPI}`
        // nftApiLink
      );
      const { data } = response;
      setNftObj(data);

      // setTimeout(() => {
      //   console.clear();
      // }, 5000);
    } catch (error) {
      console.error("Catch error:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={dark ? "dark-theme" : "light-theme"}>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <AppLayout
                currency={currency}
                setCurrency={setCurrency}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                setSearchInput={setSearchInput}
                searchInput={searchInput}
                setDark={setDark}
              />
            }
          >
            {/* <Route index element={<HomePage />} /> */}
            <Route index element={<Navigate to="/collections" />} />
            <Route
              path="collections"
              element={
                <Collections
                  // favs={favs}
                  // setFavs={setFavs}
                  nftObj={nftObj}
                  setNftObj={setNftObj}
                  currency={currency}
                  timeRange={timeRange}
                  onlyFavs={onlyFavs}
                  setOnlyFavs={setOnlyFavs}
                  dark={dark}
                  userFavCollections={userFavCollections}
                  setUserFavCollections={setUserFavCollections}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/collections/:slug" element={<CollectionItem />} />
          </Route>
          {
            //anything under here is outside of the applayout
          }
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      {/* <CollectionItem /> */}
    </div>
  );
}

export default App;
