import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Components/Home/Home";
import { HOME_PATH } from "./routeConstants";

export const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <Home />,
  },
]);
