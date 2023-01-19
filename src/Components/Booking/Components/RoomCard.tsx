import { IRoom } from "../../../Utils/types";
import "../BookingStyles.css";
import { SelectedMark } from "./SelectedMark";

import playersIcon from "../../../Assets/console 1.svg";
import timeIcon from "../../../Assets/clock 1.svg";
import ageIcon from "../../../Assets/vr-glasses 2.svg";

interface Props {
  room: IRoom;
  isSelected?: boolean;
  onClick: (room: IRoom) => void;
}

export const RoomCard: React.FC<Props> = ({ room, isSelected, onClick }) => {
  return (
    <div
      className={`room-card-wrapper selectable-card-wrapper${
        isSelected ? " selectable-card-wrapper-selected" : ""
      }`}
      onClick={() => onClick(room)}
    >
      <div className="selectable-card-bg room-card-bg">
        <h2 className="room-card-title"> {room.title} </h2>
        <div className="room-card-description">
          <div className="room-card-description-item">
            <img src={playersIcon} alt="Число игроков" />
            1-{room.guest_max}
          </div>

          <div className="room-card-description-item">
            <img src={timeIcon} alt="Число игроков" />
            40 мин.
          </div>

          <div className="room-card-description-item">
            <img src={ageIcon} alt="Число игроков" />
            12+
          </div>
        </div>
        <SelectedMark isSelected={!!isSelected} />
      </div>
    </div>
  );
};
