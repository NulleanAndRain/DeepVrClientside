import React from "react";
import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./Utils/router";

export function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
