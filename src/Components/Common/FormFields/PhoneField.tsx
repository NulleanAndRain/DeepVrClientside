import { Control, FieldError } from "react-hook-form";
import { FormField } from "./FormField";

import "../CommonStyles.css";

import phoneIcon from "../../../Assets/phone.svg";

interface Props {
  control: Control<any, any>;
  error?: FieldError;
  autocomplete?: string;
  unregister?: boolean;
  required?: boolean;
}

export const PhoneInput: React.FC<Props> = ({
  control,
  error,
  autocomplete,
  unregister,
  required,
}) => {
  const pattern = {
    /* regex :
      '+' or without '+'
      1 to 3 numbers
      any count of ' ' or '-'
      '(' or without '('
      3 numbers
      ')' or without ')'
      any count of ' ' or '-'
      3 numbers
      any count of ' ' or '-'
      2 numbers
      any count of ' ' or '-'
      2 numbers
    */
    value:
      /^[+]{0,1}\d{1,3}[ -]*[(]{0,1}\d{3}[)]{0,1}[ -]*\d{3}[ -]*\d{2}[ -]*\d{2}$/,
    message: "Введите правильный номер телефона",
  };
  return (
    <FormField
      name="phone"
      placeholder="Введите телефон"
      pattern={pattern}
      type="tel"
      control={control}
      error={error}
      icon={phoneIcon}
      required={required ? "Введите телефон" : undefined}
      autocomplete={autocomplete}
      unregister={unregister}
    />
  );
};
