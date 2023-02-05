import { Col } from "antd";
import { getCurrentStep } from "../../../Utils/redux/bookingSlice";
import { useAppSelector } from "../../../Utils/redux/store";
import { BackButton } from "../Components/BackButton";
import { FixedPanel } from "../Components/FixedPanel";
import { NextButton } from "../../Common/NextButton";
import { StepDisplay } from "../Components/StepDisplay";
import { Title } from "../Components/Title";

import "../BookingStyles.css";

interface Props {
  children: React.ReactElement;
  title: string;
  onNextClick: () => void;
  onBackClick: () => void;
  isNextBtnActive: boolean;
}

export const StageLayout: React.FC<Props> = ({
  children,
  title,
  onNextClick,
  onBackClick,
  isNextBtnActive,
}) => {
  const currentStep = useAppSelector(getCurrentStep);
  return (
    <>
      <StepDisplay selected={currentStep} />
      <div className="booking-viewport-alt">
        <Title fontSize={46}>{title}</Title>
        {children}
      </div>
      <FixedPanel>
        <Col xs={12} sm={10} md={9} lg={8} xl={7} xxl={6}>
          <BackButton onClick={onBackClick}>Назад</BackButton>
        </Col>
        <Col xs={12} sm={10} md={9} lg={8} xl={7} xxl={6}>
          <NextButton onClick={onNextClick} isActive={isNextBtnActive}>
            Далее
          </NextButton>
        </Col>
      </FixedPanel>
    </>
  );
};
