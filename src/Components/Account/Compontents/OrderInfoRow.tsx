import { curencyFormat } from "../../../Utils/format";
import "../AccountStyles.css";

export const OrderInfoRow: React.FC = () => {
  return (
    <div className="profile-order-info">
      <div className="profile-order-info-row profile-order-info-row-header">
        <span className="profile-order-info-span">№0000</span>
        <span className="profile-order-info-span">
          {curencyFormat.format(0)}
        </span>
      </div>
      <div className="profile-order-info-row">
        <span className="profile-order-info-span">
          5 персон | Выбор на месте | VR квест с погружением.
        </span>
        <span className="profile-order-info-row-date">от 27 июня </span>
      </div>
    </div>
  );
};
