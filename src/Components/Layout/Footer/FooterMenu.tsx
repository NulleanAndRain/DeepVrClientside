import { Col, Row } from "antd";
import "../../../App.css";
import { FooterMenuButton } from "./FooterMenuButton";

import gamesIcon from "../../../Assets/games.svg";
import bookingIcon from "../../../Assets/booking.svg";
import achivementsIcon from "../../../Assets/achivements.svg";
import accountIcon from "../../../Assets/account.svg";
import {
  ACCOUNT_PATH,
  ACHIVEMENTS_PATH,
  BOOKING_PATH,
  HOME_PATH,
} from "../../../Utils/routeConstants";

export const FooterMenu: React.FC = () => {
  return (
    <Row justify="center" className="footer-menu-wrapper">
      <Col
        xs={24}
        sm={18}
        md={14}
        lg={12}
        xl={10}
        xxl={8}
        className="footer-menu"
      >
        <FooterMenuButton icon={gamesIcon} text="Игры" linkTo={HOME_PATH} />
        <FooterMenuButton
          icon={bookingIcon}
          text="Бронирование"
          linkTo={BOOKING_PATH}
        />
        <FooterMenuButton
          icon={achivementsIcon}
          text="Достижения"
          linkTo={ACHIVEMENTS_PATH}
        />
        <FooterMenuButton
          icon={accountIcon}
          text="Аккаунт"
          linkTo={ACCOUNT_PATH}
        />
      </Col>
    </Row>
  );
};
