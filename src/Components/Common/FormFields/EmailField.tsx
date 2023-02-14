import { Control, FieldError } from "react-hook-form";
import { FormField } from "./FormField";

import emailIcon from "../../../Assets/emailIcon.svg";

import "../CommonStyles.css";

interface Props {
  control: Control<any, any>;
  required?: boolean;
  autocomplete?: string;
  error?: FieldError;
  unregister?: boolean;
}

export const EmailField: React.FC<Props> = ({
  control,
  required,
  autocomplete,
  error,
  unregister,
}) => {
  const pattern = {
    // eslint-disable-next-line no-useless-escape
    value: /^[-\w\.]+@[\w-]+\.+[\w-]{2,}$/i,
    message: "Введите правильный E-Mail",
  };
  return (
    <FormField
      type="email"
      icon={emailIcon}
      control={control}
      name="email"
      placeholder="E-Mail"
      required={required ? "Введите E-Mail" : undefined}
      autocomplete={autocomplete}
      pattern={pattern}
      error={error}
      unregister={unregister}
    />
  );
};
