import { useState } from "react";
import { Col, Row } from "antd";
import {
  decreaseStep,
  getCredentials,
  increaseStep,
  setCredentials,
} from "../../../Utils/redux/bookingSlice";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { StageLayout } from "./StageLayout";
import { PromoModal } from "../Components/PromoModal";
import infoIcon from "../../../Assets/infoIcon.svg";
import { useForm } from "react-hook-form";
import { getIsAuthorised } from "../../../Utils/redux/authSlice";
import { NavLink } from "react-router-dom";
import { ACCOUNT_PATH } from "../../../Utils/routeConstants";

import "../BookingStyles.css";

import userIcon from "../../../Assets/user-icon-liliac.svg";
import phoneIcon from "../../../Assets/phone.svg";
import mark from "../../../Assets/checkboxMark.svg";
import arrowRight from "../../../Assets/arrow-right.svg";

const agreementHref = "/";
const bonusesInfoHref = "/";

export const CredentialsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  const isAuthorised = useAppSelector(getIsAuthorised);

  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: useAppSelector(getCredentials),
  });

  const [isPromoActive, setIsPromoActive] = useState(true);
  const [areBonusesActive, setAreBonusesActive] = useState(true);

  const values = getValues();

  const openModal = () => {
    setIsPromoModalOpen(true);
  };
  const closeModal = () => {
    setIsPromoModalOpen(false);
  };
  const submitModalRes = (result: string) => {
    setValue("promo", result);
    setAreBonusesActive(!result);
    setIsPromoModalOpen(false);
  };

  const hasNoErrors =
    !errors.name &&
    !errors.phone &&
    !errors.licenseAgree &&
    watch("licenseAgree");

  const onNextClick = () => {
    if (hasNoErrors) {
      dispatch(setCredentials(values));
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
      isNextBtnActive={hasNoErrors}
    >
      <Row justify="center" gutter={[20, 20]}>
        <Col xs={24} sm={20} md={14} lg={12} xl={10} xxl={8}>
          <form className="credentials-container">
            <PromoModal
              isOpen={isPromoModalOpen}
              onCancel={closeModal}
              onSubmit={submitModalRes}
              value={values.promo}
            />

            {errors.name && (
              <div className="credentials-error">{errors.name.message}</div>
            )}
            <div className="credentials-input">
              <img src={userIcon} alt="" className="credentials-input-icon" />
              <input
                {...register("name", {
                  required: "Введите имя",
                  minLength: 2,
                })}
                type="text"
                className="credentials-input-field"
                placeholder="Введите ваше имя"
              />
            </div>

            {errors.phone && (
              <div className="credentials-error">{errors.phone.message}</div>
            )}
            <div className="credentials-input">
              <img src={phoneIcon} alt="" className="credentials-input-icon" />
              <input
                {...register("phone", {
                  required: "Введите телефон",
                  /* regex :
                    '+' or without '+'
                    1 to 3 numbers
                    any count of ' ' or '-'
                    '(' or without '('
                    3 numbers
                    ')' or without ')'
                    any count of ' ' or '-'
                    3 numbers
                    any count of ' ' or '-'
                    2 numbers
                    any count of ' ' or '-'
                    2 numbers
                  */
                  pattern: {
                    value:
                      /^[+]{0,1}\d{1,3}[ -]*[(]{0,1}\d{3}[)]{0,1}[ -]*\d{3}[ -]*\d{2}[ -]*\d{2}$/,
                    message: "Введите правильный номер телефона",
                  },
                })}
                type="tel"
                className="credentials-input-field"
                placeholder="Введите телефон"
              />
            </div>

            {errors.licenseAgree && (
              <div className="credentials-error">
                {errors.licenseAgree.message}
              </div>
            )}
            <label className="credentials-label">
              <input
                {...register("licenseAgree", {
                  required: "Необходимо принять пользовательское соглашение",
                })}
                type="checkbox"
              />
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

            {isAuthorised ? (
              <>
                <div
                  className={`credentials-promo-btn credentials-description${
                    isPromoActive ? "" : " credentials-not-usable"
                  }`}
                  onClick={isPromoActive ? openModal : undefined}
                >
                  <input
                    {...register("promo")}
                    type="hidden"
                    className="hidden"
                  />
                  <span>Промокод или сертификат</span>
                  <img src={arrowRight} alt="" />
                </div>

                <div
                  className={`credentials-bonuses-container${
                    areBonusesActive ? "" : " credentials-not-usable"
                  }`}
                >
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
                    <input
                      {...register("useDiscount", {
                        onChange: (e) => {
                          setIsPromoActive(!e.target.checked);
                          setValue("useDiscount", e.target.checked);
                        },
                      })}
                      type="checkbox"
                      disabled={!areBonusesActive}
                    />
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
              </>
            ) : (
              <>
                <NavLink
                  to={ACCOUNT_PATH}
                  className="credentials-need-login"
                  onClick={openModal}
                >
                  Чтобы использовать бонусы или промокод необходимо{" "}
                  <span>войти</span>
                </NavLink>
              </>
            )}
          </form>
        </Col>
      </Row>
    </StageLayout>
  );
};
