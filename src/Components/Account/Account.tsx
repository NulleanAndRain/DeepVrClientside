import { DefaultLayout } from "../Layout/DefaultLayout";
import { Login } from "./Compontents/Login";
import "./AccountStyles.css";
import { useAppSelector } from "../../Utils/redux/store";
import { getIsAuthorised } from "../../Utils/redux/authSlice";
import { useState } from "react";
import { Register } from "./Compontents/Register";

export const Account: React.FC = () => {
  const isAuthorised = useAppSelector(getIsAuthorised);
  const [loginForm, setLoginForm] = useState<"login" | "register">("login");

  const onRegClick = () => {
    setLoginForm("register");
  };
  const onLoginClick = () => {
    setLoginForm("login");
  };

  return (
    <DefaultLayout>
      {isAuthorised ? (
        <>ъеъ</>
      ) : loginForm === "login" ? (
        <Login onRegisterClick={onRegClick} />
      ) : (
        <Register onLoginClick={onLoginClick} />
      )}
    </DefaultLayout>
  );
};
