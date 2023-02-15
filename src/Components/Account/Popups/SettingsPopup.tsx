import { PopupLayout } from "./PopupLayout";

import arrowRight from "../../../Assets/arrow-right.svg";

import "../AccountStyles.css";
import { ProfileSettingsPopup } from "./ProfileSettingsPopup";
import { AboutPopup } from "./AboutPopup";
import { FeebackPopup } from "./FeebackPopup";

interface Props {
  onBackClick: () => void;
  addPopup: (elem: React.ReactElement) => void;
}

export const SettingsPopup: React.FC<Props> = ({ onBackClick, addPopup }) => {
  return (
    <PopupLayout title="Настройки" onBackClick={onBackClick}>
      <div className="profile-divide popup-settings-divide">
        <div
          className="popup-settings-row"
          onClick={() =>
            addPopup(<ProfileSettingsPopup onBackClick={onBackClick} />)
          }
        >
          Настройки профиля
          <img src={arrowRight} alt="" className="popup-settings-row-icon" />
        </div>

        <div
          className="popup-settings-row popup-settings-row-line-up"
          onClick={() => addPopup(<AboutPopup onBackClick={onBackClick} />)}
        >
          О приложении
          <img src={arrowRight} alt="" className="popup-settings-row-icon" />
        </div>

        <div
          className="popup-settings-row popup-settings-row-line-up"
          onClick={() => addPopup(<FeebackPopup onBackClick={onBackClick} />)}
        >
          Форма обратной связи
          <img src={arrowRight} alt="" className="popup-settings-row-icon" />
        </div>
      </div>
    </PopupLayout>
  );
};
