import { Col, Row } from "antd";
import { DefaultLayout } from "./Layout/DefaultLayout";

export const NotFound: React.FC = () => {
  return (
    <DefaultLayout>
      <Row style={{ height: "90vh" }} justify="center" align="middle">
        <Col span={24}>
          <h1>404</h1>
          <p>страница не найдена</p>
        </Col>
      </Row>
    </DefaultLayout>
  );
};
