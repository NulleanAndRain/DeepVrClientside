import { Control, FieldError, Validate, ValidationRule } from "react-hook-form";
import { FormError } from "./FormError";

import "../CommonStyles.css";

interface Props {
  control: Control<any, any>;
  name: string;
  icon: string;
  type: string;
  placeholder?: string;
  error?: FieldError;
  required?: string | ValidationRule<boolean>;
  pattern?: ValidationRule<RegExp>;
  minLength?: ValidationRule<number>;
  afterElem?: React.ReactElement;
  validate?: Validate<any, any> | Record<string, Validate<any, any>>;
  autocomplete?: string;
}

export const FormField: React.FC<Props> = ({
  control,
  error,
  icon,
  required,
  pattern,
  type,
  placeholder,
  name,
  minLength,
  afterElem,
  validate,
  autocomplete,
}) => {
  return (
    <>
      <FormError error={error} />
      <label className="form-field">
        <img src={icon} alt="" className="form-field-icon" />
        <input
          {...control.register(name, {
            required,
            pattern,
            minLength,
            validate,
          })}
          type={type}
          className="form-field-input"
          placeholder={placeholder}
          autoComplete={autocomplete}
        />
        {afterElem}
      </label>
    </>
  );
};
