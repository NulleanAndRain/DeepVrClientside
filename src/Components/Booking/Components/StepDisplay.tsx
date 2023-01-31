import { Col, Row } from "antd";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import dash from "../../../Assets/Line 1.svg";
import { getMaxStep, setStep } from "../../../Utils/redux/bookingSlice";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
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
          <Circle num={num} selected={selected} />
          <img className="step-circle-dash" src={dash} alt="dashed line" />
        </Fragment>
      ))}
      <Circle num={6} selected={selected} />
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

const Circle = ({ num, selected }: { num: number; selected: number }) => {
  const dispatch = useAppDispatch();
  const maxStep = useAppSelector(getMaxStep);

  const clickable = num !== selected && num <= maxStep;
  return (
    <div
      className={`step-circle${
        num === selected ? "" : " step-circle-unselected"
      } ${clickable ? "step-circle-clickable" : "step-circle-not-clickable"}`}
      onClick={clickable ? () => dispatch(setStep(num)) : undefined}
    >
      <div className="step-circle-text">{num}</div>
    </div>
  );
};
