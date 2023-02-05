import { Control } from "react-hook-form";

import "./CommonStyles.css";

interface Props {
  control: Control<any, any>;
  name: string;
  placeholder?: string;
  cols: number;
  rows: number;
}

export const TextAreaInput: React.FC<Props> = ({
  control,
  placeholder,
  name,
  cols,
  rows,
}) => {
  return (
    <div className="form-field">
      <textarea
        {...control.register(name)}
        className="form-field-input form-input-textarea"
        placeholder={placeholder}
        cols={cols}
        rows={rows}
      />
    </div>
  );
};
