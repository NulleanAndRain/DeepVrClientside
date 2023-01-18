import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../Components/404";
import { Home } from "../Components/Home/Home";
import { HOME_PATH } from "./routeConstants";

export const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
