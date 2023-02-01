import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  decreaseStep,
  getCredentials,
  getDate,
  getGame,
  getPlayersCount,
  getRoom,
  getTime,
  increaseStep,
} from "../../../Utils/redux/bookingSlice";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { Title } from "../Components/Title";
import { FixedPanel } from "../Components/FixedPanel";
import { BackButton } from "../Components/BackButton";
import { NextButton } from "../Components/NextButton";
import { IBookingCredentials, ISummaryResponse } from "../../../Utils/types";
import { Api } from "../../../Utils/api";
import { getUser } from "../../../Utils/redux/authSlice";

import "../BookingStyles.css";

import userIcon from "../../../Assets/user-icon-liliac.svg";
import gameIcon from "../../../Assets/console.svg";
import dateIcon from "../../../Assets/calendar.svg";
import timeIcon from "../../../Assets/time.svg";

export const ConfirmBooking: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(getUser);
  const room = useAppSelector(getRoom);
  const game = useAppSelector(getGame);
  const count = useAppSelector(getPlayersCount);
  const date = useAppSelector(getDate)?.substring(0, 10);
  const time = useAppSelector(getTime)?.substring(0, 5);

  const { promo, useDiscount } = useAppSelector(
    getCredentials
  ) as IBookingCredentials;

  const [summary, setSummary] = useState<ISummaryResponse>();

  const onNextClick = () => {
    dispatch(increaseStep());
  };
  const onBackClick = () => {
    dispatch(decreaseStep());
  };

  const numberFormat = Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    Api.getSummary({
      game_id: game?.id ?? -1,
      guest_count: count ?? -1,
      user_id: user?.id,
      promocode: promo,
      use_bonus: useDiscount,
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          console.log(res);
          setSummary(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [game, count, user, promo, useDiscount]);

  return (
    <>
      <div className="booking-viewport">
        <Title fontSize={46}>Бронирование</Title>
        <Row justify="center">
          <Col xs={24} sm={20} md={14} lg={12} xl={10} xxl={8}>
            <Row
              justify="center"
              className="summary-params-table"
              gutter={[10, 24]}
            >
              <Col
                className="summary-params-table-cell summary-params-table-description"
                span={6}
              >
                Зал:
              </Col>
              <Col className="summary-params-table-cell" span={18}>
                {room?.title}
              </Col>

              <Col
                className="summary-params-table-cell summary-params-table-description"
                span={6}
              >
                <img
                  src={gameIcon}
                  alt="Игра"
                  className="summary-params-table-description-img"
                />
              </Col>
              <Col className="summary-params-table-cell" span={18}>
                {game?.title}
              </Col>

              <Col
                className="summary-params-table-cell summary-params-table-description"
                span={6}
              >
                <img
                  src={userIcon}
                  alt="Число игроков"
                  className="summary-params-table-description-img"
                />
              </Col>
              <Col className="summary-params-table-cell" span={18}>
                {count}
              </Col>

              <Col
                className="summary-params-table-cell summary-params-table-description"
                span={6}
              >
                <img
                  src={dateIcon}
                  alt="Дата"
                  className="summary-params-table-description-img"
                />
              </Col>
              <Col className="summary-params-table-cell" span={18}>
                {date}
              </Col>

              <Col
                className="summary-params-table-cell summary-params-table-description"
                span={6}
              >
                <img
                  src={timeIcon}
                  alt="Время"
                  className="summary-params-table-description-img"
                />
              </Col>
              <Col className="summary-params-table-cell" span={18}>
                {time}
              </Col>
            </Row>
            <Col span={24} className="summary-bg">
              <div className="summary-row">
                <span>Стоимость заказа:</span>
                <span className="summary-row-price">
                  {summary && numberFormat.format(summary.price)}
                </span>
              </div>
              {summary && summary.promo_discount && (
                <div className="summary-row">
                  <span>Промокод:</span>
                  <span className="summary-row-price">
                    {numberFormat.format(summary.promo_discount)}
                  </span>
                </div>
              )}
              {summary && summary.bonus_discount && (
                <div className="summary-row">
                  <span>Бонусы:</span>
                  <span className="summary-row-price">
                    {numberFormat.format(summary.bonus_discount)}
                  </span>
                </div>
              )}

              <div className="summary-total">
                <span>Итого:</span>
                <span className="summary-total-price">
                  {summary && numberFormat.format(summary.total)}
                </span>
              </div>
            </Col>
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
