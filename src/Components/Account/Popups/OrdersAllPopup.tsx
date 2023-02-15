import { OrderInfoRow } from "../Compontents/OrderInfoRow";
import { PopupLayout } from "./PopupLayout";

import "../AccountStyles.css";
import { OrderInfoRowEmpty } from "../Compontents/OrderInfoRowEmpty";

interface Props {
  onBackClick: () => void;
}

export const OrdersAllPopup: React.FC<Props> = ({ onBackClick }) => {
  return (
    <PopupLayout title="Заказы" onBackClick={onBackClick}>
      <OrderInfoRow />
      <OrderInfoRowEmpty />
    </PopupLayout>
  );
};
