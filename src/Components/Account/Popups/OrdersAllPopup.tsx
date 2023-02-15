import { OrderInfoRow } from "../Compontents/OrderInfoRow";
import { PopupLayout } from "./PopupLayout";
import { OrderInfoRowEmpty } from "../Compontents/OrderInfoRowEmpty";
import { useState } from "react";

import ordoredIcon from "../../../Assets/ordoredIcon.svg";
import unordoredIcon from "../../../Assets/unordoredIcon.svg";

import "../AccountStyles.css";

interface Props {
  onBackClick: () => void;
}

export const OrdersAllPopup: React.FC<Props> = ({ onBackClick }) => {
  const [isOrdered, setIsOrdered] = useState(false);

  return (
    <PopupLayout title="Заказы" onBackClick={onBackClick}>
      <div className="popup-order-table-header">
        Заказы
        <img
          src={isOrdered ? ordoredIcon : unordoredIcon}
          alt="Сортировка"
          className="popup-order-table-header-icon"
          onClick={() => setIsOrdered(!isOrdered)}
        />
      </div>
      {
        /* map history from props */ <OrderInfoRow
          date="от 30 февраля"
          description="5 персон | Выбор на месте | VR квест с погружением."
          orderId={0}
          price={1448}
          key="хехе"
        />
      }
      <OrderInfoRowEmpty />
    </PopupLayout>
  );
};
