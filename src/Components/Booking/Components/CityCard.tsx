import { ICity } from "../../../Utils/types";
import "../BookingStyles.css";

import moai from "../moai.jpg";
import { SelectedMark } from "./SelectedMark";

interface Props {
  city: ICity;
  isSelected: boolean;
  onClick: (city: ICity) => void;
}

export const CityCard: React.FC<Props> = ({ city, isSelected, onClick }) => {
  return (
    <div
      className={`city-card-wrapper selectable-card-wrapper${
        isSelected ? " selectable-card-wrapper-selected" : ""
      }`}
      onClick={(e) => onClick(city)}
    >
      <div
        className="selectable-card-bg city-card-bg"
        style={{ backgroundImage: `url(${moai})` }}
      >
        <div className="city-card-text">{city.name}</div>
        <SelectedMark isSelected={isSelected} />
      </div>
    </div>
  );
};
