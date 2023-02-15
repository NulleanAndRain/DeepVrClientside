import { Modal } from "antd";

import crossWhite from "../../../Assets/crossWhite.svg";

import "../AccountStyles.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const BonusInfoModal: React.FC<Props> = ({ isOpen, onClose, title }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closeIcon={<img src={crossWhite} alt="Закрыть" />}
    >
      <div className="bonus-description-modal-header">{title}</div>
      <div className="bonus-description-modal">описание вида бонусов</div>
    </Modal>
  );
};
