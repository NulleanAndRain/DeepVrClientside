import { Col } from "antd";
import { IChildren } from "../../../Utils/types";

interface Props {
  children?: IChildren;
  className?: string;
}

export const ColLg: React.FC<Props> = ({ children, className }) => {
  return (
    <Col xs={24} sm={20} md={14} lg={12} xl={10} xxl={8} className={className}>
      {children}
    </Col>
  );
};
