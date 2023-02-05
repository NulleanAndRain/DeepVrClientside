import { useState } from "react";
import { Row } from "antd";
import {
  decreaseStep,
  getCredentials,
  increaseStep,
  setCredentials,
} from "../../../Utils/redux/bookingSlice";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { StageLayout } from "./StageLayout";
import { PromoModal } from "../Components/PromoModal";
import { useForm } from "react-hook-form";
import {
  getIsAuthorised,
  getToken,
  getUser,
} from "../../../Utils/redux/authSlice";
import { NavLink } from "react-router-dom";
import { ACCOUNT_PATH } from "../../../Utils/routeConstants";
import { ColLg } from "../../Common/ColLg";
import { FormField } from "../../Common/FormField";
import { PhoneInput } from "../../Common/PhoneInput";
import { FormCheckbox } from "../../Common/FormCheckbox";
import { TextAreaInput } from "../../Common/TextAreaInput";

import "../BookingStyles.css";
import "../../Common/CommonStyles.css";

import infoIcon from "../../../Assets/infoIcon.svg";
import userIcon from "../../../Assets/user-icon-liliac.svg";
import mark from "../../../Assets/checkboxMark.svg";
import arrowRight from "../../../Assets/arrow-right.svg";

const agreementHref = "/";
const bonusesInfoHref = "/";

export const CredentialsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  const isAuthorised = useAppSelector(getIsAuthorised);
  const token = useAppSelector(getToken);
  const user = useAppSelector(getUser);

  const credentials = useAppSelector(getCredentials);

  const {
    register,
    setValue,
    getValues,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      ...credentials,
      name: credentials?.name ?? user?.name,
      phone: credentials?.phone ?? user?.phone,
    },
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

  const onNextClick = () => {
    if (isValid) {
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
      isNextBtnActive={isValid}
    >
      <Row justify="center" gutter={[20, 20]}>
        <ColLg>
          <form className="credentials-container">
            <PromoModal
              isOpen={isPromoModalOpen}
              onCancel={closeModal}
              onSubmit={submitModalRes}
              value={values.promo}
            />

            <FormField
              error={errors.name}
              name="name"
              control={control}
              icon={userIcon}
              type="text"
              required="Введите имя"
              minLength={2}
              placeholder="Введите ваше имя"
            />

            <PhoneInput control={control} error={errors.phone} />

            <FormCheckbox
              control={control}
              error={errors.licenseAgree}
              required="Необходимо принять пользовательское соглашение"
              name="licenseAgree"
              children={
                <span>
                  Я принимаю условия{" "}
                  <a href={agreementHref} target="_blank" rel="noreferrer">
                    пользовательского соглашения{" "}
                  </a>
                </span>
              }
            />

            <TextAreaInput
              control={control}
              name="comment"
              placeholder="Комментарий"
              cols={40}
              rows={5}
            />

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

                  <FormCheckbox
                    control={control}
                    name="useDiscount"
                    children={<span>Списать до 20% баллами</span>}
                    onChange={(e) => {
                      setIsPromoActive(!e.target.checked);
                      setValue("useDiscount", e.target.checked);
                    }}
                  />
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
        </ColLg>
      </Row>
    </StageLayout>
  );
};
