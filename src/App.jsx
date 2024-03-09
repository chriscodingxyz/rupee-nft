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
import supabase from "./services/supabase";

import { useQuery, useMutation } from "@tanstack/react-query";
const nftAPI = import.meta.env.VITE_NFTAPI;
const nftApiLink = "nftData.json";
function App() {
  const {
    data: nftObj,
    error,
    isLoading: nftObjLoading,
  } = useQuery({
    queryKey: ["nftObj"],
    queryFn: async () => {
      const response = await fetch(
        `https://nftpricefloor.quickapi.io/api/projects?qapikey=${nftAPI}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // console.log("ok==>>>>", response.json());
      return response.json();
    },
  });

  console.log("===>>>", nftObj);

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  //   return (
  //     <div>
  //       <h1>Todos</h1>
  //       <p>{JSON.stringify(data)}</p>
  //       {/* <ul>
  //         {data.map((todo) => (
  //           <li key={todo.id}>{todo.title}</li>
  //         ))}
  //       </ul> */}
  //     </div>
  //   );
  // }

  const [userFavCollections, setUserFavCollections] = useLocalStorage(
    "userFavCollections",
    []
  );
  const [dark, setDark] = useLocalStorage("dark", false);
  // const [nftObj, setNftObj] = useState(null);
  const [currency, setCurrency] = useState("Native");
  const [timeRange, setTimeRange] = useState("24h");
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [supaCount, setSupaCount] = useState(null);

  // async function fetchApiCount() {
  //   let { data: stats, error } = await supabase
  //     .from("stats")
  //     .select("quickapi_count");

  //   setSupaCount(stats[0].quickapi_count);

  //   // setSupaCount(stats)
  //   return stats[0].quickapi_count;
  // }

  // async function updateCount() {
  //   // const { data, error } = await supabase
  //   //   .from("stats")
  //   //   .select("quickapi_count");

  //   // if (error) {
  //   //   console.error("Error fetching current count:", error.message);
  //   //   return;
  //   // }
  //   const fetchedCount = await fetchApiCount();

  //   console.log("func within func =>", supaCount);

  //   // const currentCount = data[0].quickapi_count;

  //   // Update the count in the database
  //   const { data: updateData, error: updateError } = await supabase
  //     .from("stats")
  //     .update({ quickapi_count: fetchedCount + 1 })
  //     .eq("id", 1)
  //     .select("quickapi_count");

  //   if (updateError) {
  //     console.error("Error updating count:", updateError.message);
  //     return;
  //   }
  //   console.log("new data => =>", updateData);

  //   setSupaCount(updateData[0].quickapi_count);

  //   console.log("Count updated successfully!");
  // }

  // async function fetchData() {
  //   try {
  //     const response = await axios.get(
  //       `https://nftpricefloor.quickapi.io/api/projects?qapikey=${nftAPI}`
  //       // nftApiLink
  //     );
  //     const { data } = response;
  //     // setNftObj(data);

  //     // setTimeout(() => {
  //     //   console.clear();
  //     // }, 5000);
  //   } catch (error) {
  //     console.error("Catch error:", error);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  //   // fetchApiCount();
  //   // console.log("stats =>", supaCount);
  // }, []);

  return (
    <div className={dark ? "dark-theme" : "light-theme"}>
      <Toaster richColors />
      <BrowserRouter>
        {/* <button onClick={updateCount}>click</button> */}
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
                  nftObjLoading={nftObjLoading}
                  nftObj={nftObj}
                  // setNftObj={setNftObj}
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
