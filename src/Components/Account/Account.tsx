import { DefaultLayout } from "../Layout/DefaultLayout";
import { Login } from "./Compontents/Login";
import "./AccountStyles.css";

export const Account: React.FC = () => {
  const onRegClick = () => {
    console.log("reg");
  };
  return (
    <DefaultLayout>
      <Login onRegisterClick={onRegClick} />
    </DefaultLayout>
  );
};
