import { Col } from "antd";
import { IChildren } from "../../../Utils/types";

interface Props {
  children?: IChildren;
  className?: string;
}

export const ColHalf: React.FC<Props> = ({ children, className }) => {
  return (
    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} className={className}>
      {children}
    </Col>
  );
};
