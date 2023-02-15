import { PopupHeader, PopupHeaderProps } from "../Compontents/PopupHeader";

import "../AccountStyles.css";
import { IChildren } from "../../../Utils/types";

export interface PopupProps extends PopupHeaderProps {
  children?: IChildren;
}

export const PopupLayout: React.FC<PopupProps> = ({
  onBackClick,
  title,
  children,
}) => {
  return (
    <div className="popup-wrapper">
      <PopupHeader onBackClick={onBackClick} title={title} />
      {children}
    </div>
  );
};
