import { Modal } from "antd";
import "../BookingStyles.css";

import closeIcon from "../../../Assets/closeIcon.svg";
import loadIcon from "../../../Assets/load.svg";

interface Props {
  isOpen: boolean;
  onSubmit: (result: string) => void;
  onCancel: () => void;
}

export const PromoModal: React.FC<Props> = ({ isOpen, onCancel, onSubmit }) => {
  const submit = () => {
    onSubmit("123");
  };

  const Footer = () => (
    <div className="modal-promo-footer">
      <button className="modal-promo-btn" onClick={submit}>
        Применить
      </button>
    </div>
  );

  return (
    <>
      {isOpen && (
        <Modal
          open={isOpen}
          onCancel={onCancel}
          footer={<Footer />}
          closeIcon={<img src={closeIcon} alt="close" />}
        >
          <div className="modal-promo-content">
            <div className="modal-promo-title">Введите промокод</div>
            <div className="credentials-input modal-promo-error-input modal-promo-success-input">
              <input
                type="text"
                className="credentials-input-field"
                placeholder="Промокод"
              />
              <img
                src={loadIcon}
                alt="load"
                className="modal-promo-load-image"
              />
            </div>
            <div className="modal-promo-err-block ">Егор!</div>
            <div className="modal-promo-description">
              Место для информации о том как и где можно получить промокод.
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
