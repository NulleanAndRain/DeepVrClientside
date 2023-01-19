interface Props {
  children: React.ReactNode;
  fontSize?: number;
}

export const Title: React.FC<Props> = ({ children, fontSize = 32 }) => {
  return (
    <div style={{ fontSize }} className="booking-header-wrapper">
      <h1 className="booking-header">{children}</h1>
    </div>
  );
};
