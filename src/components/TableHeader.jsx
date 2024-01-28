import React from "react";

export default function TableHeader() {
  return (
    <thead>
      <tr>
        <th className="w-8">⭐️</th>
        <th className="w-6"></th>
        <th className="w-32">Name</th>
        <th className="w-14">ETH</th>
        <th className="w-14">USD</th>
      </tr>
    </thead>
  );
}
