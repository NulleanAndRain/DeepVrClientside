import { Col, Row } from "antd";
import React, { useState } from "react";
import { decreaseStep, increaseStep } from "../../../Utils/redux/bookingSlice";
import { useAppDispatch } from "../../../Utils/redux/store";

import "../BookingStyles.css";
import { Title } from "../Components/Title";
import { FixedPanel } from "../Components/FixedPanel";
import { BackButton } from "../Components/BackButton";
import { NextButton } from "../Components/NextButton";

export const ConfirmBooking: React.FC = () => {
  const dispatch = useAppDispatch();

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);

  const [summary, setSummary] = useState({
    price: "----",
    promoDiscount: "----",
    bonucesDiscout: "----",
    total: "----",
  });

  const onNextClick = () => {
    dispatch(increaseStep());
  };
  const onBackClick = () => {
    dispatch(decreaseStep());
  };

  return (
    <>
      <div className="booking-viewport">
        <Title fontSize={46}>Бронирование</Title>
        <Row justify="center">
          <Col xs={24} sm={20} md={14} lg={12} xl={10} xxl={8}>
            ъеъ
          </Col>
        </Row>
      </div>
      <FixedPanel>
        <Col xs={12} sm={10} md={9} lg={8} xl={7} xxl={6}>
          <BackButton onClick={onBackClick}>Назад</BackButton>
        </Col>
        <Col xs={12} sm={10} md={9} lg={8} xl={7} xxl={6}>
          <NextButton onClick={onNextClick} isActive={true}>
            Далее
          </NextButton>
        </Col>
      </FixedPanel>
    </>
  );
};
