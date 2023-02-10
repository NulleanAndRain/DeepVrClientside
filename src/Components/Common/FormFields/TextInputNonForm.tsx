import "../CommonStyles.css";

interface Props {
  statusClassName?: string;
  placeholder?: string;
  afterElem?: React.ReactElement;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  inputRef?: React.LegacyRef<HTMLInputElement>;
}

export const TextInputNonForm: React.FC<Props> = ({
  statusClassName,
  placeholder,
  afterElem,
  defaultValue,
  onChange,
  onBlur,
  inputRef,
}) => {
  return (
    <>
      <label className={`form-field ${statusClassName}`}>
        <input
          type="text"
          className="form-field-input"
          placeholder={placeholder}
          ref={inputRef}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
        />
        {afterElem}
      </label>
    </>
  );
};
