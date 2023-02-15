import { PopupLayout } from "./PopupLayout";

import "../AccountStyles.css";

interface Props {
  onBackClick: () => void;
}

export const ProfileSettingsPopup: React.FC<Props> = ({ onBackClick }) => {
  return (
    <PopupLayout title="Настройки профиля" onBackClick={onBackClick}>
      настройки профиля
    </PopupLayout>
  );
};
