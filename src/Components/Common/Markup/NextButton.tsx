import "../CommonStyles.css";

interface Props {
  children: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
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
        onClick?.();
      }}
    >
      {children}
    </button>
  );
};
