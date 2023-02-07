import { getSelectedCity } from "../../Utils/redux/authSlice";
import { useAppSelector } from "../../Utils/redux/store";
import { DefaultLayout } from "../Layout/DefaultLayout";
import { GamesList } from "./Components/GamesList";

import "./GamesStyles.css";
import { CitySelectHome } from "./Components/CitySelectHome";

export const Games: React.FC = () => {
  const city = useAppSelector(getSelectedCity);
  return (
    <DefaultLayout>{!!city ? <GamesList /> : <CitySelectHome />}</DefaultLayout>
  );
};
