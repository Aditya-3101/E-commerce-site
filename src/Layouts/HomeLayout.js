import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";

export function HomeLayout() {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer/>
    </React.Fragment>
  );
}
