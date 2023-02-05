import { Control, FieldError, Validate, ValidationRule } from "react-hook-form";

import "./CommonStyles.css";
import { FormError } from "./FormError";

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
}) => {
  return (
    <>
      <FormError error={error} />
      <label className="form-field">
        <img src={icon} alt="" className="form-input-icon" />
        <input
          {...control.register(name, {
            required,
            pattern: pattern,
            minLength,
            validate,
          })}
          type={type}
          className="form-field-input"
          placeholder={placeholder}
        />
        {afterElem}
      </label>
    </>
  );
};
