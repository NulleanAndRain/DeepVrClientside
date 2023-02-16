import { useState } from "react";
import { BonusInfoModal } from "./BonusInfoModal";

import infoIcon from "../../../Assets/infoIcon.svg";

import "../AccountStyles.css";
import { numberFormat } from "../../../Utils/format";

interface Props {
  id?: string;
  cardRef: React.RefObject<any>;
  header: string;
  value: number;
  description?: string;
  image: string;
}

export const BonusCard: React.FC<Props> = ({
  id,
  cardRef,
  header,
  value,
  description,
  image,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bonus-card" id={id} ref={cardRef}>
      <BonusInfoModal
        title={header}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <img src={image} alt="" className="bonus-card-bg-img" />
      <div className="bonus-card-container">
        <div className="bonus-card-header">
          {header}
          <img
            src={infoIcon}
            alt="Подробнее"
            className="bonus-card-header-img"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <div className="bonus-card-main">
          {numberFormat.format(value)}
          {description && (
            <div className="bonus-card-main-description">{description}</div>
          )}
        </div>
      </div>
    </div>
  );
};
