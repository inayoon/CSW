import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export function ProtectedRoutes({ isAuth }: { isAuth: boolean }) {
  return isAuth ? <Outlet /> : <Navigate to={"/"} />;
}

export function ProtectedAdmin({ isAdmin }: { isAdmin: boolean | null }) {
  return isAdmin ? <Outlet /> : <Navigate to={"/"} />;
}
