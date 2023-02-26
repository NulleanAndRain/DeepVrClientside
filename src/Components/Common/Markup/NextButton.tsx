import "../CommonStyles.css";

interface Props {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NextButton: React.FC<Props> = ({
  onClick,
  children,
  isActive,
}) => {
  return (
    <button
      className={`next-btn${isActive ? "" : " next-btn-inactive"}`}
      onClick={(e) => {
        e.preventDefault();
        isActive && onClick?.(e);
      }}
    >
      {children}
    </button>
  );
};
