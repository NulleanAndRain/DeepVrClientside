import { Control, FieldError, ValidationRule } from "react-hook-form";

import mark from "../../Assets/checkboxMark.svg";
import "./CommonStyles.css";

interface Props {
  control: Control<any, any>;
  name: string;
  error?: FieldError;
  required?: string | ValidationRule<boolean>;
  children: React.ReactElement | Array<React.ReactElement>;
  onChange?: (event: any) => void;
}

export const FormCheckbox: React.FC<Props> = ({
  control,
  name,
  error,
  required,
  children,
  onChange,
}) => {
  return (
    <>
      {error && <div className="form-error">{error.message}</div>}
      <label className="form-label">
        <input
          {...control.register(name, {
            required,
            onChange,
          })}
          type="checkbox"
        />
        <span className="form-checkbox">
          <img src={mark} alt="" className="form-description-img" />
        </span>
        {children}
      </label>
    </>
  );
};
