import { Col, Row } from "antd";
import { FixedPanel } from "../Components/FixedPanel";
import { NextButton } from "../Components/NextButton";
import { Title } from "../Components/Title";
import { useAppDispatch } from "../../../Utils/redux/store";
import { clearState, setStep } from "../../../Utils/redux/bookingSlice";

import "../BookingStyles.css";
import { HOME_PATH } from "../../../Utils/routeConstants";
import { useState } from "react";
import { Navigate } from "react-router";

export const Done: React.FC = () => {
  const dispatch = useAppDispatch();

  const [useRedirect, setUseRedirect] = useState(false);

  const onNextClick = () => {
    dispatch(setStep(0));
    dispatch(clearState());
    setUseRedirect(true);
  };

  return (
    <>
      {useRedirect ? (
        <Navigate to={HOME_PATH} />
      ) : (
        <>
          <div className="booking-viewport ">
            <Title fontSize={32}>Ваша бронь принята!</Title>
            <Row justify="start" gutter={[20, 20]}></Row>
          </div>
          <FixedPanel>
            <Col xs={24} sm={20} md={18} lg={16} xl={14} xxl={12}>
              <NextButton onClick={onNextClick} isActive={true}>
                Жду встречи!
              </NextButton>
            </Col>
          </FixedPanel>
        </>
      )}
    </>
  );
};
