import { useEffect, useState } from "react";
import { Api } from "../../Utils/api";
import { setSelectedCity } from "../../Utils/redux/authSlice";
import { useAppDispatch } from "../../Utils/redux/store";
import { ICity } from "../../Utils/types";

import "./CommonStyles.css";

interface Props {
  selected: ICity | undefined;
  onSelect: (city: ICity | undefined) => void;
}

export const SelectCityList: React.FC<Props> = ({ selected, onSelect }) => {
  const [cities, setCities] = useState<Array<ICity>>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tempSelected = selected;
    onSelect(undefined);
    Api.getAllCities()
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setCities(res.data);
          if (!res.data.find((c) => c.id === tempSelected?.id)) {
            dispatch(setSelectedCity(undefined));
          } else {
            onSelect(tempSelected);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="city-select-wrapper">
      {!!cities ? (
        cities.map((c) => {
          return (
            <div
              className={`city-select-row${
                c.id === selected?.id ? " city-select-row-selected" : ""
              }`}
              key={c.code}
              onClick={() => onSelect(c)}
            >
              {c.name}
            </div>
          );
        })
      ) : (
        <div className="city-select-no-available">Нет доступных городов</div>
      )}
    </div>
  );
};
