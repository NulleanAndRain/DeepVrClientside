import { PopupLayout } from "./PopupLayout";

import "../AccountStyles.css";

interface Props {
  onBackClick: () => void;
}

export const FeebackPopup: React.FC<Props> = ({ onBackClick }) => {
  return (
    <PopupLayout title="Форма обратной связи" onBackClick={onBackClick}>
      не звоните сюда
    </PopupLayout>
  );
};
