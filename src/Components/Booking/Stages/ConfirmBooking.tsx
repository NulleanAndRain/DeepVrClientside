import { Col, Row } from "antd";
import React from "react";
import { decreaseStep, increaseStep } from "../../../Utils/redux/bookingSlice";
import { useAppDispatch } from "../../../Utils/redux/store";
import { StageLayout } from "./StageLayout";

import "../BookingStyles.css";

export const ConfirmBooking: React.FC = () => {
  const dispatch = useAppDispatch();

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);

  const onNextClick = () => {
    dispatch(increaseStep());
  };
  const onBackClick = () => {
    dispatch(decreaseStep());
  };

  return (
    <StageLayout
      title="Выберите удобный день"
      onNextClick={onNextClick}
      onBackClick={onBackClick}
      isNextBtnActive={true}
    >
      <Row justify="center">
        <Col xs={24} sm={20} md={14} lg={12} xl={10} xxl={8}>
          ъеъ
        </Col>
      </Row>
    </StageLayout>
  );
};
