import { Modal } from "antd";
import "../BookingStyles.css";

import closeIcon from "../../../Assets/closeIcon.svg";
import loadIcon from "../../../Assets/load.svg";
import { useEffect, useRef, useState } from "react";
import { FormError } from "../../Common/FormError";
import { TextInputNonForm } from "../../Common/TextInputNonForm";
import { ISummaryResponse } from "../../../Utils/types";
import { useAppSelector } from "../../../Utils/redux/store";
import { getToken, getUser } from "../../../Utils/redux/authSlice";
import { getGame, getPlayersCount } from "../../../Utils/redux/bookingSlice";
import { Api } from "../../../Utils/api";

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

  const user = useAppSelector(getUser);
  const token = useAppSelector(getToken);
  const game = useAppSelector(getGame);
  const count = useAppSelector(getPlayersCount);

  const [summary, setSummary] = useState<ISummaryResponse>();
  const [error, setError] = useState<string>();
  const [isValid, setIsValid] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Api.getSummary({
      game_id: game?.id ?? -1,
      guest_count: count ?? -1,
      user_id: user?.id,
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setSummary(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [game, count, user]);

  const onChange = () => {
    setIsSuccess(false);
    if (!inputRef.current?.value) {
      setIsValid(true);
      setError("");
      return;
    }
    setIsLoading(true);
    Api.validatePromo({
      game: game?.id ?? -1,
      price: summary?.price ?? 0,
      token,
      promo_code: inputRef.current?.value ?? "",
    })
      .then((res) => {
        if (Api.checkStatus(res.status)) {
          if (res.data) {
            setIsSuccess(true);
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        }
      })
      .catch((err) => {
        setIsValid(false);
        setError("Ошибка сервера");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const submit = () => {
    onSubmit(inputRef.current?.value ?? "");
  };

  const Footer = () => (
    <div className="modal-promo-footer">
      <button
        className={`modal-promo-btn ${
          isValid ? "" : "modal-promo-btn-inactive"
        }`}
        onClick={isValid ? submit : undefined}
      >
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

            <FormError errorMsg={error} />
            <TextInputNonForm
              placeholder="Промокод"
              inputRef={inputRef}
              defaultValue={value}
              afterElem={
                <>
                  {isLoading && (
                    <img
                      src={loadIcon}
                      alt="load"
                      className="modal-promo-load-image"
                    />
                  )}
                </>
              }
              statusClassName={
                !isValid
                  ? "modal-promo-error-input"
                  : isSuccess
                  ? "modal-promo-success-input"
                  : ""
              }
              onChange={onChange}
            />
            <div className="modal-promo-description">
              Место для информации о том как и где можно получить промокод.
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
