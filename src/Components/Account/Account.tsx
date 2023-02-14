import { DefaultLayout } from "../Layout/DefaultLayout";
import { Login } from "./Panels/Login";
import { useAppSelector } from "../../Utils/redux/store";
import { getIsAuthorised } from "../../Utils/redux/authSlice";
import { useState } from "react";
import { Register } from "./Panels/Register";
import { Profile } from "./Panels/Profile";

import "./AccountStyles.css";

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
        <Profile />
      ) : loginForm === "login" ? (
        <Login onRegisterClick={onRegClick} />
      ) : (
        <Register onLoginClick={onLoginClick} />
      )}
    </DefaultLayout>
  );
};
