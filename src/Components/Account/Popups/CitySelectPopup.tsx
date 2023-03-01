import { PopupLayout } from "./PopupLayout";
import { SelectCityList } from "../../Common/Markup/SelectCityList";
import { useState } from "react";
import { ICity } from "../../../Utils/types";
import { NextButton } from "../../Common/Markup/NextButton";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { getToken, setSelectedCity } from "../../../Utils/redux/authSlice";

import "../AccountStyles.css";
import { Api } from "../../../Utils/api";

interface Props {
  onBackClick: () => void;
  preselected?: ICity;
}

export const CitySelectPopup: React.FC<Props> = ({
  onBackClick,
  preselected,
}) => {
  const [selected, setSelected] = useState<ICity | undefined>(preselected);
  const dispatch = useAppDispatch();

  const token = useAppSelector(getToken);

  const onSubmit = () => {
    if (!!selected) {
      dispatch(setSelectedCity(selected));
      Api.setUserCity({ token, city: selected.name }).catch((err) =>
        console.log(err)
      );
      onBackClick();
    }
  };
  return (
    <PopupLayout title="Выбрать город" onBackClick={onBackClick}>
      <div className="select-city-popup-wrapper">
        <SelectCityList onSelect={setSelected} selected={selected} />
        <NextButton isActive={!!selected} onClick={onSubmit}>
          Подтвердить
        </NextButton>
      </div>
    </PopupLayout>
  );
};
