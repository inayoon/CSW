import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes({ isAuth }) {
  return;
  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
}
