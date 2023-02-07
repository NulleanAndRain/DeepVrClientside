import { Col } from "antd";
import React from "react";

interface Props {
  children?:
    | React.ReactElement
    | Array<React.ReactElement>
    | string
    | null
    | undefined;
  className?: string;
}

export const ColLg: React.FC<Props> = ({ children, className }) => {
  return (
    <Col xs={24} sm={20} md={14} lg={12} xl={10} xxl={8} className={className}>
      {children}
    </Col>
  );
};
