import { Control, FieldError, ValidationRule } from "react-hook-form";

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
  minLength?: number;
  afterElem?: React.ReactElement;
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
