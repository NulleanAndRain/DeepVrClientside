import { Row } from "antd";
import "../BookingStyles.css";

interface Props {
  children: React.ReactNode;
}

export const FixedPanel: React.FC<Props> = ({ children }) => {
  return (
    <Row className="fixed-panel" justify="center" gutter={[20, 20]}>
      {children}
    </Row>
  );
};
