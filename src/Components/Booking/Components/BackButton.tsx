import "../BookingStyles.css";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export const BackButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button className="back-btn" onClick={onClick}>
      <div className="back-btn-inner">{children}</div>
    </button>
  );
};
