interface Props {
  children: React.ReactNode;
  fontSize: number;
}

export const Title: React.FC<Props> = ({ children, fontSize }) => {
  return (
    <div
      style={{ fontSize: `${fontSize}px` }}
      className="booking-header-wrapper"
    >
      <h1 className="booking-header">{children}</h1>
    </div>
  );
};
