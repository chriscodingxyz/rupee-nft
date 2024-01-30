import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import SearchSection from "../components/SearchSection";
import {
  favs,
  nftObj,
  currency,
  timeRange,
  onlyFavs,
  dark,
  searchInput,
} from "../GlobalSignals";

export default function AppLayout(
  {
    // currency,
    // setCurrency,
    // timeRange,
    // setTimeRange,
    // setSearchInput,
    // searchInput,
    // setDark,
  }
) {
  return (
    <div className="flex flex-col" id="applayout">
      {/* Header */}
      <Header
      // setDark={setDark}
      />

      {/* Search Section */}

      <SearchSection
      // currency={currency}
      // setCurrency={setCurrency}
      // timeRange={timeRange}
      // setTimeRange={setTimeRange}
      // setSearchInput={setSearchInput}
      // searchInput={searchInput}
      />

      {/* Outlet (Scrollable Content) */}
      <div className="flex-grow overflow-y-auto">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
