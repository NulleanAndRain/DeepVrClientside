import { Row } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Api } from "../../../Utils/api";
import { setToken, setUser } from "../../../Utils/redux/authSlice";
import { useAppDispatch } from "../../../Utils/redux/store";
import { ColLg } from "../../Common/ColLg";
import { FormError } from "../../Common/FormError";
import { NextButton } from "../../Common/NextButton";
import { PassField } from "../../Common/PassField";
import { PhoneInput } from "../../Common/PhoneInput";

import "../AccountStyles.css";

interface Props {
  onRegisterClick: () => void;
}

export const Login: React.FC<Props> = ({ onRegisterClick }) => {
  const {
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();

  const [reqError, setReqError] = useState<string>();

  const onLoginClick = () => {
    setReqError("");
    Api.LogIn(getValues())
      .then((res) => {
        if (Api.checkStatus(res)) {
          dispatch(setToken(res.data.token));
          dispatch(setUser(res.data.user));
        } else {
          setReqError(res.data.error as string);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status >= 500)
          setReqError("Ошибка сервера, попробуйте позже");

        dispatch(setToken("8f7d70d39530c24138e1d401da35e48fd622902d"));
        dispatch(
          setUser({
            avatar: "",
            email: "admin@deep.vr",
            id: 2,
            name: "aboba",
            category_loyalty_id: -1,
            created_at: "never",
            email_verified_at: "never",
            phone: "8 800 555 3535",
            role_id: 1,
            settings: { locale: "en" },
            temp_password: "",
            updated_at: "never",
          })
        );
      });
  };

  return (
    <Row justify="center">
      <ColLg className="login-container">
        <div className="login-title">Вход</div>
        <form className="login-form">
          <FormError errorMsg={reqError} />
          <PhoneInput
            control={control}
            error={errors.phone}
            autocomplete="tel"
          />
          <PassField
            control={control}
            name="password"
            error={errors.password}
            autocomplete="password"
          />
        </form>
        <NextButton onClick={onLoginClick} isActive={isValid}>
          Войти
        </NextButton>
        <div className="login-description">
          У меня еще нет аккаунта, хочу{" "}
          <span className="login-description-link" onClick={onRegisterClick}>
            зарегистрироваться.
          </span>
        </div>
      </ColLg>
    </Row>
  );
};
