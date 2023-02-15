import "../AccountStyles.css";

import arrowLeftLight from "../../../Assets/arrowLeftLight.svg";

export interface PopupHeaderProps {
  title: string;
  onBackClick: () => void;
}

export const PopupHeader: React.FC<PopupHeaderProps> = ({
  onBackClick,
  title,
}) => {
  return (
    <div className="profile-header popup-header">
      <span className="popup-back-btn" onClick={onBackClick}>
        <img src={arrowLeftLight} alt="Назад" className="popup-back-btn-icon" />
        Назад
      </span>
      <span>{title}</span>
    </div>
  );
};
