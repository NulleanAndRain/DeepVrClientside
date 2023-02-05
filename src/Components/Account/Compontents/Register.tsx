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
      passwordRepeat: "",
    },
  });

  const dispatch = useAppDispatch();

  const [reqError, setReqError] = useState<string>();

  const onRegisterClick = () => {
    setReqError("");
    // Api.LogIn(getValues())
    //   .then((res) => {
    //     if (Api.checkStatus(res.status)) {
    //       dispatch(setToken(res.data.token));
    //       dispatch(setUser(res.data.user));
    //     } else {
    //       setReqError(res.data.error as string);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     if (err.response.status >= 500)
    //       setReqError("Ошибка сервера, попробуйте позже");
    //   });
    dispatch(setToken("123"));
    dispatch(
      setUser({
        avatar: "",
        email: "aboba@aboba.com",
        id: -1,
        name: "aboba",
        category_loyalty_id: -1,
        created_at: "never",
        email_verified_at: "never",
        phone: "8 800 555 3535",
        role_id: -1,
        settings: [],
        temp_password: "",
        updated_at: "never",
      })
    );
    console.log("reg");
  };

  return (
    <Row justify="center">
      <ColLg className="login-container">
        <div className="login-title">Регистрация</div>
        <form className="login-form">
          <FormError errorMsg={reqError} />
          <PhoneInput control={control} error={errors.phone} />
          <PassField
            control={control}
            name="password"
            error={errors.password}
          />
          <PassField
            control={control}
            name="passwordRepeat"
            error={errors.passwordRepeat}
            placeholder="Повторите пароль"
            requred="Введите подтверждение пароля"
            validate={{
              matchPass: (value) =>
                value === getValues().password || "Пароли должны совпадать",
            }}
          />
        </form>
        <NextButton onClick={onRegisterClick} isActive={isValid}>
          Зарегистрироваться
        </NextButton>
        <div className="login-description">
          У меня уже есть аккаунт.{" "}
          <span className="login-description-link" onClick={onLoginClick}>
            Войти.
          </span>
        </div>
      </ColLg>
    </Row>
  );
};
