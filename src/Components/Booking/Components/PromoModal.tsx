import { Modal } from "antd";
import "../BookingStyles.css";

import closeIcon from "../../../Assets/closeIcon.svg";
import loadIcon from "../../../Assets/load.svg";
import { useRef } from "react";

interface Props {
  isOpen: boolean;
  onSubmit: (result: string) => void;
  onCancel: () => void;
  value?: string;
}

export const PromoModal: React.FC<Props> = ({
  isOpen,
  onCancel,
  onSubmit,
  value,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    onSubmit(inputRef.current?.value ?? "");
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
                defaultValue={value}
                ref={inputRef}
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
