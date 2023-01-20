import "../BookingStyles.css";

import timeIcon from "../../../Assets/Vector.svg";
import timeIconAlt from "../../../Assets/VectorDark.svg";

interface Props {
  time: Date;
  isSelected?: boolean;
  onClick: (time: Date) => void;
}

export const TimeCard: React.FC<Props> = ({ time, isSelected, onClick }) => {
  return (
    <div
      className={`selectable-card-wrapper time-card-wrapper`}
      onClick={() => onClick(time)}
    >
      <div
        className={`selectable-card-bg time-card-bg${
          isSelected ? " time-card-bg-selected" : ""
        }`}
      >
        <img
          src={isSelected ? timeIconAlt : timeIcon}
          alt="время"
          className="time-card-img"
        />
        <h2 className="room-card-title">
          {time.toLocaleTimeString().substring(0, 5)}{" "}
        </h2>
      </div>
    </div>
  );
};
