import React from "react";
import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/about">about</NavLink>
        </li>
        <li>
          <NavLink to="/collections">collections</NavLink>
        </li>
        <li></li>
      </ul>
    </div>
  );
}
