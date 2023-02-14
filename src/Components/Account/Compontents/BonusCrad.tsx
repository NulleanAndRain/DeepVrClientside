import "../AccountStyles.css";

interface Props {
  id?: string;
  cardRef: React.RefObject<any>;
}

export const BonusCard: React.FC<Props> = ({ id, cardRef }) => {
  return (
    <div className="bonus-card" id={id} ref={cardRef}>
      b
    </div>
  );
};
