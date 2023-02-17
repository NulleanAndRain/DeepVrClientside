import { curencyFormat, dateFormatDayMonth } from "../../../Utils/format";
import { IOrderHistoryItem } from "../../../Utils/types";
import "../AccountStyles.css";

interface Props {
  order: IOrderHistoryItem;
}

export const OrderInfoRow: React.FC<Props> = ({ order }) => {
  const countLastDigit = order.guest_quantity % 10;

  const ending =
    countLastDigit === 1
      ? "а"
      : countLastDigit >= 2 && countLastDigit <= 4
      ? "ы"
      : "";

  return (
    <div className="profile-order-info">
      <div className="profile-order-info-row profile-order-info-row-header">
        <span className="profile-order-info-span">
          № {order.id.toString().padStart(4, "0")}
        </span>
        <span className="profile-order-info-span">
          {curencyFormat.format(order.price)}
        </span>
      </div>
      <div className="profile-order-info-row">
        <span className="profile-order-info-span">{`${
          order.guest_quantity
        } персон${ending} | ${order.games
          ?.map((game) => game.title)
          ?.join(" | ")}`}</span>
        <span className="profile-order-info-row-date">
          {`от ${dateFormatDayMonth.format(new Date(order.booking_date))}`}
        </span>
      </div>
    </div>
  );
};
