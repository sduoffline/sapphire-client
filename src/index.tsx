import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import AppContextProvider from "./components/hooks/context";
import { useState } from "react";
const container = document.getElementById("root");
const root = createRoot(container!);



export default function Index() {
  return (
    <App />
  )
}


root.render(
  <Index />
);

