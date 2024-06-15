"use client";

import React from "react";
import dynamic from "next/dynamic";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../AppRoutes";

const App = dynamic(() => import("../App"), { ssr: false });

export function ClientOnly() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
