import { ICity } from "../../../Utils/types";
import "../BookingStyles.css";

import moai from "../moai.jpg";
import mark from "../../../Assets/selectedMark.svg";

interface Props {
  city: ICity;
  isSelected: boolean;
  onClick: (city: ICity) => void;
}

export const CityCard: React.FC<Props> = ({ city, isSelected, onClick }) => {
  return (
    <div
      className={`city-card-wrapper${
        isSelected ? " city-card-wrapper-selected" : ""
      }`}
      onClick={(e) => onClick(city)}
    >
      <div className="city-card-bg" style={{ backgroundImage: `url(${moai})` }}>
        <div className="city-card-text">{city.name}</div>
        {isSelected && (
          <div className="city-card-mark">
            <img src={mark} alt="selected" />
          </div>
        )}
      </div>
    </div>
  );
};
