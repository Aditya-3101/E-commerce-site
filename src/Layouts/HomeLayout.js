import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Home/Header";

export function HomeLayout() {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
}
