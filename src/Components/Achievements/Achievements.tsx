import { Row } from "antd";
import { ColLg } from "../Common/ColLg";
import { DefaultLayout } from "../Layout/DefaultLayout";
import "./AchievementsStyles.css";

import img from "../../Assets/mirage-astronaut.png";

export const Achievements: React.FC = () => {
  return (
    <DefaultLayout>
      <Row justify="center">
        <ColLg>
          <div className="achievments-header">
            Раздел находится в разработке
          </div>
          <img src={img} alt="" className="achievments-image" />
          <div className="achievments-text">
            Данный раздел не готов и находится в разработке, возвращатесь позже
          </div>
        </ColLg>
      </Row>
    </DefaultLayout>
  );
};
