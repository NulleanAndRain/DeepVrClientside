import { FieldError } from "react-hook-form";

interface Props {
  error?: FieldError;
  errorMsg?: string;
}

export const FormError: React.FC<Props> = ({ error, errorMsg }) => {
  return (
    <>
      {error && <div className="form-error">{error.message}</div>}
      {errorMsg && <div className="form-error">{errorMsg}</div>}
    </>
  );
};
