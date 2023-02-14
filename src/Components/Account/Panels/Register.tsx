import { Row } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Api } from "../../../Utils/api";
import { setToken, setUser } from "../../../Utils/redux/authSlice";
import { useAppDispatch } from "../../../Utils/redux/store";
import { ColLg } from "../../Common/Markup/ColLg";
import { FormError } from "../../Common/FormFields/FormError";
import { FormField } from "../../Common/FormFields/FormField";
import { NextButton } from "../../Common/Markup/NextButton";
import { PassField } from "../../Common/FormFields/PassField";
import { PhoneInput as PhoneField } from "../../Common/FormFields/PhoneField";

import userIcon from "../../../Assets/user-icon-liliac.svg";

import "../AccountStyles.css";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";
import { EmailField } from "../../Common/FormFields/EmailField";

interface Props {
  onLoginClick: () => void;
}

export const Register: React.FC<Props> = ({ onLoginClick }) => {
  const {
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      phone: "",
      password: "",
      "password-repeat": "",
      email: "",
    },
  });

  const dispatch = useAppDispatch();

  const [reqError, setReqError] = useState<string>();

  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const onRegisterClick = () => {
    setReqError("");
    console.log("register, fields:", getValues());

    setIsLoading(true);
    Api.register(getValues())
      .then((res) => {
        console.log(res);
        if (Api.checkStatus(res)) {
          if (!res.data.error) {
            // dispatch
          } else {
            setError(res.data.error);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Ошибка сервера, попробуйте позже");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Row justify="center">
      <ColLg className="login-container">
        <div className="login-title">Регистрация</div>
        <form className="login-form">
          <FormError errorMsg={reqError} />
          <FormField
            control={control}
            icon={userIcon}
            name="name"
            type="text"
            required="Введите ваше имя"
            placeholder="Имя"
            autocomplete="name"
          />
          <PhoneField
            control={control}
            error={errors.phone}
            autocomplete="username"
          />
          <EmailField
            control={control}
            error={errors.email}
            autocomplete="email"
            required
          />
          <PassField
            control={control}
            name="password"
            error={errors.password}
            autocomplete="current-password"
          />
          <PassField
            control={control}
            name="password-repeat"
            error={errors["password-repeat"]}
            placeholder="Повторите пароль"
            requred="Введите подтверждение пароля"
            validate={{
              matchPass: (value) =>
                value === getValues().password || "Пароли должны совпадать",
            }}
            autocomplete="new-password"
          />
        </form>
        <FormError errorMsg={error} />
        <NextButton onClick={onRegisterClick} isActive={isValid}>
          Зарегистрироваться
        </NextButton>
        <div className="login-description">
          У меня уже есть аккаунт.{" "}
          <span className="login-description-link" onClick={onLoginClick}>
            Войти.
          </span>
        </div>
        <LoadWrapper isLoading={isLoading} height={1} />
      </ColLg>
    </Row>
  );
};
