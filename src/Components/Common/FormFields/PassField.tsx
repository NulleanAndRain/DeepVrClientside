import { useState } from "react";
import { Control, FieldError, Validate } from "react-hook-form";
import { FormField } from "./FormField";

import "../CommonStyles.css";

import passIcon from "../../../Assets/passIcon.svg";
import passVisible from "../../../Assets/passVisible.svg";
import passHidden from "../../../Assets/passHidden.svg";

interface Props {
  control: Control<any, any>;
  name: string;
  placeholder?: string;
  error?: FieldError;
  validate?: Validate<any, any> | Record<string, Validate<any, any>>;
  requred?: string;
  autocomplete?: string;
}

export const PassField: React.FC<Props> = ({
  control,
  name,
  error,
  placeholder = "Введите пароль",
  validate,
  requred = "Введите пароль",
  autocomplete,
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
      required={requred}
      afterElem={<ToggleVisibility />}
      validate={validate}
      minLength={
        !validate
          ? {
              value: 8,
              message: "Пароль должен содержать 8 или больше символов",
            }
          : undefined
      }
      autocomplete={autocomplete}
    />
  );
};
