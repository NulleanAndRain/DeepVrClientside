import { Col, Row } from "antd";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import dash from "../../../Assets/Line 1.svg";
import "../BookingStyles.css";

interface Props {
  selected: number;
}

export const StepDisplay: React.FC<Props> = ({ selected }) => {
  const isMobile = !useMediaQuery({
    minWidth: 440,
  });
  const content = (
    <div
      className="step-circle-container"
      style={
        isMobile
          ? selected > 3
            ? { position: "absolute", right: 16 }
            : { position: "absolute", left: 16 }
          : undefined
      }
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <Fragment key={`step-circle${num}`}>
          <div
            className={`step-circle${
              num === selected ? "" : " step-circle-unselected"
            }`}
          >
            <div className="step-circle-text">{num}</div>
          </div>
          <img className="step-circle-dash" src={dash} alt="dashed line" />
        </Fragment>
      ))}
      <div
        className={`step-circle${
          6 === selected ? "" : " step-circle-unselected"
        }`}
      >
        <div className="step-circle-text">{6}</div>
      </div>
    </div>
  );

  // 576px
  return (
    <Row justify="center">
      <Col
        xs={24}
        sm={24}
        md={20}
        lg={12}
        xl={9}
        className="step-circle-wrapper"
      >
        {content}
      </Col>
    </Row>
  );
};
