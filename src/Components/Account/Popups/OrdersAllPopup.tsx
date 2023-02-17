import { OrderInfoRow } from "../Compontents/OrderInfoRow";
import { PopupLayout } from "./PopupLayout";
import { OrderInfoRowEmpty } from "../Compontents/OrderInfoRowEmpty";
import { useEffect, useState } from "react";

import ordoredIcon from "../../../Assets/ordoredIcon.svg";
import unordoredIcon from "../../../Assets/unordoredIcon.svg";

import "../AccountStyles.css";
import { IOrderHistoryItem } from "../../../Utils/types";

interface Props {
  history?: Array<IOrderHistoryItem>;
  onBackClick: () => void;
}

export const OrdersAllPopup: React.FC<Props> = ({ history, onBackClick }) => {
  const [isOrderedDesc, setIsOrdered] = useState(false);
  const [historySorted, setHistorySorted] = useState<
    Array<IOrderHistoryItem> | undefined
  >(history);

  useEffect(() => {
    setHistorySorted(history);
  }, [history]);

  const toggleSort = () => {
    if (history) {
      setIsOrdered(!isOrderedDesc);
      setHistorySorted(isOrderedDesc ? history : [...history].reverse());
    }
  };

  return (
    <PopupLayout title="Заказы" onBackClick={onBackClick}>
      <div className="popup-order-table-header">
        Заказы
        <img
          src={isOrderedDesc ? ordoredIcon : unordoredIcon}
          alt="Сортировка"
          className="popup-order-table-header-icon"
          onClick={toggleSort}
        />
      </div>
      {historySorted &&
        historySorted.map((order) => {
          return <OrderInfoRow order={order} key={order.id} />;
        })}
      <OrderInfoRowEmpty />
    </PopupLayout>
  );
};
