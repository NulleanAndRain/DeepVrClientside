import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../Components/404";
import { Account } from "../Components/Account/Account";
import { Booking } from "../Components/Booking/Booking";
import { Home } from "../Components/Home/Home";
import { ACCOUNT_PATH, BOOKING_PATH, HOME_PATH } from "./routeConstants";

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
    path: ACCOUNT_PATH,
    element: <Account />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
