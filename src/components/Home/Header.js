import NavBar from "./Nav";
import React from "react";
import SideNav from "../SideNav";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <div className="nav-header">
        <Link to="/">
          <h2>Electrify</h2>
        </Link>

        <NavBar />
      </div>
      <SideNav />
    </>
  );
}
