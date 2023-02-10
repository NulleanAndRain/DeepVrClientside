import { Control, FieldError } from "react-hook-form";
import { FormField } from "./FormField";

import emailIcon from "../../../Assets/emailIcon.svg";

import "../CommonStyles.css";

interface Props {
  control: Control<any, any>;
  name: string;
  required?: boolean;
  autocomplete?: string;
  error?: FieldError;
}

export const EmailField: React.FC<Props> = ({
  control,
  name,
  required,
  autocomplete,
  error,
}) => {
  const pattern = {
    value: /^[-\w\.]+@[\w-]+\.+[\w-]{2,}$/i,
    message: "Введите правильный E-Mail",
  };
  return (
    <FormField
      type="email"
      icon={emailIcon}
      control={control}
      name={name}
      placeholder="E-Mail"
      required={required ? "Введите E-Mail" : undefined}
      autocomplete={autocomplete}
      pattern={pattern}
      error={error}
    />
  );
};
