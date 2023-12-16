import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const LoginLayout = () => {
  const user = useSelector((state) => state.loginUser);

  if (user.length === 0) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};
