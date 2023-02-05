import { Col, Row } from "antd";
import { FixedPanel } from "../Components/FixedPanel";
import { NextButton } from "../../Common/NextButton";
import { Title } from "../Components/Title";
import { useAppDispatch } from "../../../Utils/redux/store";
import { setIsFinished } from "../../../Utils/redux/bookingSlice";
import { HOME_PATH } from "../../../Utils/routeConstants";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

import "../BookingStyles.css";

import doneImg from "../../../Assets/mirage-done.png";

export const Done: React.FC = () => {
  const dispatch = useAppDispatch();

  const [useRedirect, setUseRedirect] = useState(false);

  const onNextClick = () => {
    setUseRedirect(true);
  };

  useEffect(() => {
    if (useRedirect) {
      dispatch(setIsFinished(true));
    }
  });

  return (
    <>
      {useRedirect ? (
        <Navigate to={HOME_PATH} relative={"route"} />
      ) : (
        <>
          <div className="booking-viewport ">
            <img src={doneImg} alt="Готово" className="done-img" />
            <Title fontSize={46}>Ваша бронь принята!</Title>
            <Row justify="center" gutter={[20, 20]}>
              <Col xs={24} sm={20} md={18} lg={16} xl={14} xxl={12}>
                <p className="done-text">
                  В ближайшее время с вами свяжется менеджер для подтверждения
                  бронирования.
                </p>
              </Col>
            </Row>
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
