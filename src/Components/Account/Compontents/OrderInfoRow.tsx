import { curencyFormat } from "../../../Utils/format";
import "../AccountStyles.css";

interface Props {
  orderId: number;
  price: number;
  description: string;
  date: string;
}

export const OrderInfoRow: React.FC<Props> = ({
  date,
  description,
  orderId,
  price,
}) => {
  return (
    <div className="profile-order-info">
      <div className="profile-order-info-row profile-order-info-row-header">
        <span className="profile-order-info-span">
          № {orderId.toString().padStart(4, "0")}
        </span>
        <span className="profile-order-info-span">
          {curencyFormat.format(price)}
        </span>
      </div>
      <div className="profile-order-info-row">
        <span className="profile-order-info-span">{description}</span>
        <span className="profile-order-info-row-date">{date}</span>
      </div>
    </div>
  );
};
