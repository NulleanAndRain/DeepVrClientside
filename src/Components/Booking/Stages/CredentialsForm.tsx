import { Row } from "antd";
import { decreaseStep, increaseStep } from "../../../Utils/redux/bookingSlice";
import { useAppDispatch } from "../../../Utils/redux/store";
import { StageLayout } from "./StageLayout";

import "../BookingStyles.css";
import { useState } from "react";

export const CredentialsForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [formFilled, setFormFilled] = useState(false);

  const onNextClick = () => {
    if (!!formFilled) {
      dispatch(increaseStep());
      setFormFilled(false);
    }
  };
  const onBackClick = () => {
    dispatch(decreaseStep());
  };

  return (
    <StageLayout
      title="Напишите ваши контакты"
      onNextClick={onNextClick}
      onBackClick={onBackClick}
      isNextBtnActive={!!formFilled}
    >
      <Row justify="start" gutter={[20, 20]}>
        БЛЯТЬБ
      </Row>
    </StageLayout>
  );
};
