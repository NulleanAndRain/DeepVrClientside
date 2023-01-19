import { Col, Row } from "antd";
import { useState } from "react";
import {
  decreaseStep,
  getCurrentStep,
} from "../../../Utils/redux/bookingSlice";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { FixedPanel } from "../Components/FixedPanel";
import { NextButton } from "../Components/NextButton";
import { StepDisplay } from "../Components/StepDisplay";
import { Title } from "../Components/Title";

import "../BookingStyles.css";
import { BackButton } from "../Components/BackButton";

export const RoomSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(getCurrentStep);

  const [selected, setSelected] = useState<string>();

  const onNextClick = () => {};
  const onBackClick = () => {
    dispatch(decreaseStep());
  };

  return (
    <>
      <StepDisplay selected={currentStep} />
      <div className="booking-viewport-alt">
        <Title fontSize={46}>Выберите VR Комнату</Title>
      </div>
      <FixedPanel>
        <Col xs={12} sm={10} md={9} lg={8} xl={7} xxl={6}>
          <BackButton onClick={onBackClick}>Назад</BackButton>
        </Col>
        <Col xs={12} sm={10} md={9} lg={8} xl={7} xxl={6}>
          <NextButton onClick={onNextClick} isActive={!!selected}>
            Далее
          </NextButton>
        </Col>
      </FixedPanel>
    </>
  );
};
