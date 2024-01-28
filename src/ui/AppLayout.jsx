import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import SearchSection from "../components/SearchSection";

export default function AppLayout({
  currency,
  setCurrency,
  timeRange,
  setTimeRange,
}) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Search Section */}
      <div className="overflow-x-auto h-40">
        <SearchSection
          currency={currency}
          setCurrency={setCurrency}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
      </div>
      {/* Outlet (Scrollable Content) */}
      <div className="flex-grow overflow-y-auto">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
