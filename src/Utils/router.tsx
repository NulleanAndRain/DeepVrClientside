import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../Components/404";
import { Booking } from "../Components/Booking/Booking";
import { Home } from "../Components/Home/Home";
import { BOOKING_PATH, HOME_PATH } from "./routeConstants";

export const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <Home />,
  },
  {
    path: BOOKING_PATH,
    element: <Booking />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
