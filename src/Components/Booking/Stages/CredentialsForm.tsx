import { useState } from "react";
import { Col, Row } from "antd";
import { decreaseStep, increaseStep } from "../../../Utils/redux/bookingSlice";
import { useAppDispatch } from "../../../Utils/redux/store";
import { StageLayout } from "./StageLayout";
import { PromoModal } from "../Components/PromoModal";

import "../BookingStyles.css";

import userIcon from "../../../Assets/user-icon-liliac.svg";
import phoneIcon from "../../../Assets/phone.svg";
import mark from "../../../Assets/checkboxMark.svg";
import arrowRight from "../../../Assets/arrow-right.svg";
import infoIcon from "../../../Assets/infoIcon.svg";
import { useForm } from "react-hook-form";

const agreementHref = "/";
const bonusesInfoHref = "/";

export const CredentialsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const values = getValues();

  const openModal = () => {
    setIsPromoModalOpen(true);
  };
  const closeModal = () => {
    setIsPromoModalOpen(false);
  };
  const submitModalRes = (result: string) => {
    setValue("promo", result);
    setIsPromoModalOpen(false);
  };

  const onNextClick = () => {
    if (!errors) {
      dispatch(increaseStep());
    }
  };
  const onBackClick = () => {
    dispatch(decreaseStep());
  };

  return (
    <StageLayout
      title="Напишите ваши контакты"
      onNextClick={onNextClick}
      onBackClick={onBackClick}
      isNextBtnActive={!errors}
    >
      <Row justify="center" gutter={[20, 20]}>
        <Col xs={24} sm={20} md={14} lg={12} xl={10} xxl={8}>
          <form className="credentials-container">
            <PromoModal
              isOpen={isPromoModalOpen}
              onCancel={closeModal}
              onSubmit={submitModalRes}
              value={values["promo"]}
            />
            <div className="credentials-input">
              <img src={userIcon} alt="" className="credentials-input-icon" />
              <input
                {...register("name")}
                type="text"
                className="credentials-input-field"
                placeholder="Введите ваше имя"
              />
            </div>
            <div className="credentials-input">
              <img src={phoneIcon} alt="" className="credentials-input-icon" />
              <input
                {...register("phone")}
                type="tel"
                className="credentials-input-field"
                placeholder="+7 (___) ___-__-__"
              />
            </div>
            <label className="credentials-label">
              <input {...register("agreement")} type="checkbox" />
              <span className="credentials-checkbox">
                <img
                  src={mark}
                  alt=""
                  className="credentials-description-img"
                />
              </span>
              <span>
                Я принимаю условия{" "}
                <a href={agreementHref} target="_blank" rel="noreferrer">
                  пользовательского соглашения{" "}
                </a>
              </span>
            </label>
            <div className="credentials-input">
              <textarea
                {...register("comment")}
                className="credentials-input-field credentials-input-textarea"
                placeholder="Комментарий"
                cols={40}
                rows={5}
              />
            </div>
            <div
              className="credentials-promo-btn credentials-description "
              onClick={openModal}
            >
              <input {...register("promo")} type="hidden" className="hidden" />
              <span>Промокод или сертификат</span>
              <img src={arrowRight} alt="" />
            </div>
            <div className="credentials-bonuses-container">
              <div className="credentials-description">
                <span>Баллы и бонусы</span>
                <a href={bonusesInfoHref} target="_blank" rel="noreferrer">
                  <img
                    src={infoIcon}
                    alt=""
                    className="credentials-description-img"
                  />
                </a>
              </div>
              <label className="credentials-label">
                <input {...register("useDiscount")} type="checkbox" />
                <span className="credentials-checkbox">
                  <img
                    src={mark}
                    alt=""
                    className="credentials-description-img"
                  />
                </span>
                <span>Списать до 20% баллами</span>
              </label>
            </div>
          </form>
        </Col>
      </Row>
    </StageLayout>
  );
};
