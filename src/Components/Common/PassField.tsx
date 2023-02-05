import { useState } from "react";
import { Control, FieldError } from "react-hook-form";
import { FormField } from "./FormField";

import "./CommonStyles.css";
import passIcon from "../../Assets/passIcon.svg";
import passVisible from "../../Assets/passVisible.svg";
import passHidden from "../../Assets/passHidden.svg";

interface Props {
  control: Control<any, any>;
  name: string;
  placeholder?: string;
  error?: FieldError;
}

export const PassField: React.FC<Props> = ({
  control,
  name,
  error,
  placeholder = "Введите пароль",
}) => {
  const [typeState, setTypeState] = useState<"password" | "text">("password");
  const ToggleVisibility = () => {
    return (
      <img
        src={typeState === "password" ? passHidden : passVisible}
        alt=""
        onClick={() => {
          if (typeState === "password") setTypeState("text");
          else setTypeState("password");
        }}
      />
    );
  };

  return (
    <FormField
      type={typeState}
      name={name}
      control={control}
      icon={passIcon}
      error={error}
      placeholder={placeholder}
      required="Введите пароль"
      afterElem={<ToggleVisibility />}
    />
  );
};
