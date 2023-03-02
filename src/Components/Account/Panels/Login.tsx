import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Api } from "../../../Utils/api";
import { setToken, setUser } from "../../../Utils/redux/authSlice";
import { useAppDispatch } from "../../../Utils/redux/store";
import { ColLg } from "../../Common/Markup/ColLg";
import { FormError } from "../../Common/FormFields/FormError";
import { NextButton } from "../../Common/Markup/NextButton";
import { PassField } from "../../Common/FormFields/PassField";
import { PhoneInput } from "../../Common/FormFields/PhoneField";
import { EmailField } from "../../Common/FormFields/EmailField";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";
import { FormField } from "../../Common/FormFields/FormField";
import { ILoginForm } from "../../../Utils/types";

import "../AccountStyles.css";

import passIcon from "../../../Assets/passIcon.svg";

interface Props {
  onRegisterClick: () => void;
}

export const Login: React.FC<Props> = ({ onRegisterClick }) => {
  const {
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onTouched",
  });

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [reqError, setReqError] = useState<string>();
  const [loginVariant, setLoginVariant] = useState<"phone" | "email" | "code">(
    "phone"
  );

  const onLoginClick = () => {
    setReqError("");
    setIsLoading(true);
    if (loginVariant !== "code" || codeState === 'auth') {
      Api.login(getValues())
        .then((res) => {
          console.log(res);
          if (Api.checkStatus(res)) {
            if (!!res.data && !res.data.error) {
              dispatch(setToken(res.data.token));
              dispatch(setUser(res.data.user));
            } else {
              setReqError(
                (res.data.error_text as string) ?? "Ошибка авторизации"
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
          if (!!err.data?.error) {
            setReqError(err.data.error_text);
          } else if (err.response.status >= 500)
            setReqError("Ошибка сервера, попробуйте позже");
        })
        .finally(() => setIsLoading(false));
    } else {
      if (codeState === 'send') {
        Api.loginSendCode({ phone: getValues().phone ?? "" })
          .then((res) => {
            if (Api.checkStatus(res)) {
              console.log(res);
              if (res.data.error) {
                setReqError(res.data.error_text);
              } else {
                setCodeState('auth');
              }
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status >= 500)
              setReqError("Ошибка сервера, попробуйте позже");
          })
          .finally(() => setIsLoading(false));
      }
    }
  };

  const changeVariant = (variant: "phone" | "email" | "code") => {
    setReqError(undefined);
    if (loginVariant !== variant) setLoginVariant(variant);
  };

  const [codeState, setCodeState] = useState<"send" | "auth">("send");

  useEffect(() => {
    changeVariant("phone");
    setCodeState("send");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row justify="center">
      <ColLg className="login-container">
        <div className="login-title">Вход</div>
        <form className="login-form">
          <Row justify="center" gutter={[10, 10]}>
            <Col span={24} className="login-variants-header">
              Войти с помощью:
            </Col>
            <Col span={8}>
              <div
                className={`login-variant${
                  loginVariant === "phone" ? " login-variant-selected" : ""
                }`}
                onClick={() => changeVariant("phone")}
              >
                Номер телефона
              </div>
            </Col>
            <Col span={8}>
              <div
                className={`login-variant${
                  loginVariant === "email" ? " login-variant-selected" : ""
                }`}
                onClick={() => changeVariant("email")}
              >
                E-Mail
              </div>
            </Col>
            <Col span={8}>
              <div
                className={`login-variant${
                  loginVariant === "code" ? " login-variant-selected" : ""
                }`}
                onClick={() => changeVariant("code")}
              >
                Код на номер телефона
              </div>
            </Col>
          </Row>
          <FormError errorMsg={reqError} />
          {loginVariant === "email" ? (
            <EmailField
              control={control}
              error={errors.email}
              autocomplete="email"
              required
              unregister
            />
          ) : (
            <PhoneInput
              control={control}
              error={errors.phone}
              autocomplete="username"
              unregister
              required
            />
          )}
          {loginVariant !== "code" && (
            <PassField
              control={control}
              name="password"
              error={errors.password}
              autocomplete="current-password"
              unregister
            />
          )}
          {loginVariant === "code" && codeState === "auth" && (
            <FormField
              type="text"
              name="code"
              control={control}
              icon={passIcon}
              required="Введите код авторизации"
              unregister
              error={errors.code}
              placeholder='Код авторизации'
            />
          )}
          <LoadWrapper isLoading={isLoading} height={1} />
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
