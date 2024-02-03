import React from "react";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import SearchSection from "../components/SearchSection";

export default function AppLayout({
  currency,
  setCurrency,
  timeRange,
  setTimeRange,
  setSearchInput,
  searchInput,
  setDark,
}) {
  const location = useLocation();

  return (
    <div className="flex flex-col" id="applayout">
      {/* Header */}
      <Header setDark={setDark} />

      {/* Search Section */}
      {location.pathname === "/collections" ? (
        <SearchSection
          currency={currency}
          setCurrency={setCurrency}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      ) : null}

      {/* Outlet (Scrollable Content) */}
      <div className="flex-grow overflow-y-auto">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
