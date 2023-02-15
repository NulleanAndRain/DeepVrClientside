import "../AccountStyles.css";

interface Props {
  id?: string;
  cardRef: React.RefObject<any>;
  header: string;
  value: string | number;
  description?: string;
}

export const BonusCard: React.FC<Props> = ({
  id,
  cardRef,
  header,
  value,
  description,
}) => {
  return (
    <div className="bonus-card" id={id} ref={cardRef}>
      {header}
      {value}
      {description}
    </div>
  );
};
