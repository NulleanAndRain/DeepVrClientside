import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../Components/404";
import { Account } from "../Components/Account/Account";
import { Achievements } from "../Components/Achievements/Achievements";
import { Booking } from "../Components/Booking/Booking";
import { Games } from "../Components/Games/Games";
import {
  ACCOUNT_PATH,
  ACHIVEMENTS_PATH,
  BOOKING_PATH,
  HOME_PATH,
} from "./routeConstants";

export const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <Games />,
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
    path: ACHIVEMENTS_PATH,
    element: <Achievements />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
