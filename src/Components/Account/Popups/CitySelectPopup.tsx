import { PopupLayout } from "./PopupLayout";
import { SelectCityList } from "../../Common/Markup/SelectCityList";
import { useState } from "react";
import { ICity } from "../../../Utils/types";
import { NextButton } from "../../Common/Markup/NextButton";
import { useAppDispatch } from "../../../Utils/redux/store";
import { setSelectedCity } from "../../../Utils/redux/authSlice";

import "../AccountStyles.css";

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
  const onSubmit = () => {
    if (!!selected) {
      dispatch(setSelectedCity(selected));
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
