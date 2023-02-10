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
import { NextButton } from "../../Common/Markup/NextButton";
import { IBookingCredentials, ISummaryResponse } from "../../../Utils/types";
import { Api } from "../../../Utils/api";
import { getToken, getUser } from "../../../Utils/redux/authSlice";
import { LoadIcon } from "../../Common/Markup/LoadIcon";
import { FormError } from "../../Common/FormFields/FormError";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";

import "../BookingStyles.css";

import userIcon from "../../../Assets/user-icon-liliac.svg";
import gameIcon from "../../../Assets/console.svg";
import dateIcon from "../../../Assets/calendar.svg";
import timeIcon from "../../../Assets/time.svg";

export const ConfirmBooking: React.FC = () => {
  const dispatch = useAppDispatch();

  const token = useAppSelector(getToken);
  const user = useAppSelector(getUser);
  const room = useAppSelector(getRoom);
  const game = useAppSelector(getGame);
  const count = useAppSelector(getPlayersCount);
  const date = useAppSelector(getDate)?.substring(0, 10);
  const time = useAppSelector(getTime)?.substring(0, 5);
  const credentials = useAppSelector(getCredentials);

  const { promo, useDiscount } = useAppSelector(
    getCredentials
  ) as IBookingCredentials;

  const [summary, setSummary] = useState<ISummaryResponse>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const [isPostingForm, setIsPostingForm] = useState(false);

  const onNextClick = () => {
    if (
      !!summary &&
      !!credentials &&
      !!game &&
      !!room &&
      !!date &&
      !!time &&
      typeof count === "number"
    ) {
      setIsPostingForm(true);
      Api.createBooing({
        name: credentials.name,
        date,
        phone: credentials.phone,
        booking: {
          game_id: game.id,
          room_id: room.id,
          guest_quantity: count,
          time,
        },
        comment: credentials.comment,
        bonus: summary.bonus_discount,
        certificates: [],
        promo_code: credentials.promo ?? "",
        token,
      })
        .then((res) => {
          console.log(res);
          if (Api.checkStatus(res)) {
            dispatch(increaseStep());
          }
        })
        .catch((err) => {
          console.log(err);

          setError("Ошибка сервера, попробуйте позже");
        })
        .finally(() => setIsPostingForm(false));
    }
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
    setIsLoading(true);
    Api.getSummary({
      game_id: game?.id ?? -1,
      guest_count: count ?? -1,
      user_id: user?.id,
      promocode: promo ?? "",
      use_bonus: useDiscount,
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setSummary(res.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
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

              <FormError errorMsg={error} />
            </Row>
            <Col span={24} className="summary-bg">
              <div className="summary-row">
                <span>Стоимость заказа:</span>
                <span className="summary-row-price">
                  {isLoading ? (
                    <LoadIcon />
                  ) : (
                    <>{summary && numberFormat.format(summary.price)}</>
                  )}
                </span>
              </div>
              {!!summary && !!summary.promo_discount && (
                <div className="summary-row">
                  <span>Промокод:</span>
                  <span className="summary-row-price">
                    {isLoading ? (
                      <LoadIcon />
                    ) : (
                      <>{numberFormat.format(summary.promo_discount)}</>
                    )}
                  </span>
                </div>
              )}
              {!!summary && !!summary.bonus_discount && (
                <div className="summary-row">
                  <span>Бонусы:</span>
                  <span className="summary-row-price">
                    {isLoading ? (
                      <LoadIcon />
                    ) : (
                      <>{numberFormat.format(summary.bonus_discount)}</>
                    )}
                  </span>
                </div>
              )}

              <div className="summary-total">
                <span>Итого:</span>
                <span className="summary-total-price">
                  {isLoading ? (
                    <LoadIcon />
                  ) : (
                    <>{summary && numberFormat.format(summary.total)}</>
                  )}
                </span>
              </div>
            </Col>
          </Col>
        </Row>
        <LoadWrapper isLoading={isPostingForm} />
      </div>
      <FixedPanel>
        <Col xs={12} sm={10} md={9} lg={8} xl={7} xxl={6}>
          <BackButton onClick={onBackClick}>Назад</BackButton>
        </Col>
        <Col xs={12} sm={10} md={9} lg={8} xl={7} xxl={6}>
          <NextButton
            onClick={onNextClick}
            isActive={!!summary && !isPostingForm}
          >
            Далее
          </NextButton>
        </Col>
      </FixedPanel>
    </>
  );
};
