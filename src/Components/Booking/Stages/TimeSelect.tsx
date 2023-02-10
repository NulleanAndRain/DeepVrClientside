import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import {
  decreaseStep,
  getDate,
  getTime,
  increaseStep,
  setTime,
} from "../../../Utils/redux/bookingSlice";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { StageLayout } from "./StageLayout";
import { Api } from "../../../Utils/api";
import { TimeCard } from "../Components/TimeCard";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";

import "../BookingStyles.css";

export const TimeSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const dateString = useAppSelector(getDate) as string;

  const preselectedDate = useAppSelector(getDate);
  const preselectedTime = useAppSelector(getTime);
  const [selected, setSelected] = useState<Date | undefined>(
    preselectedDate && preselectedTime
      ? new Date(`${preselectedDate.slice(0, 10)} ${preselectedTime}`)
      : undefined
  );

  const [times, setTimes] = useState<Array<Date> | undefined>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const tempPreselect = selected;
    setSelected(undefined);
    const date = new Date(dateString);
    Api.getTimesOfDay(date)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          const dates: Array<Date> = [];

          const start = `${date.toISOString().substring(0, 10)} ${
            res.data.start_at
          }`;
          const end = `${date.toISOString().substring(0, 10)} ${
            res.data.end_at
          }`;
          const startDate = new Date(start);
          const endDate = new Date(end);

          const tempDate = new Date(startDate);
          dates.push(new Date(tempDate));

          let minutesIncrement = Number.parseInt(res.data.interval);
          while (minutesIncrement && tempDate < endDate) {
            tempDate.setMinutes(tempDate.getMinutes() + minutesIncrement);
            if (tempDate < endDate) dates.push(new Date(tempDate));
          }

          setTimes(dates);
          if (
            !dates.find(
              (d) =>
                d.toLocaleTimeString() === tempPreselect?.toLocaleTimeString()
            )
          ) {
            dispatch(setTime(undefined));
          } else {
            setSelected(tempPreselect);
          }
        }
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateString]);

  const onNextClick = () => {
    if (!!selected) {
      dispatch(setTime(selected.toLocaleTimeString()));
      dispatch(increaseStep());
    }
  };
  const onBackClick = () => {
    dispatch(decreaseStep());
  };

  const onTimeClick = (time: Date) => {
    setSelected(time);
  };

  return (
    <StageLayout
      title="Выберите подходящее время"
      onNextClick={onNextClick}
      onBackClick={onBackClick}
      isNextBtnActive={!!selected}
    >
      <LoadWrapper isLoading={isLoading}>
        <Row justify="start" gutter={[20, 20]}>
          {times &&
            times.map((time) => (
              <Col
                xs={12}
                sm={8}
                md={6}
                lg={6}
                xl={4}
                xxl={4}
                key={time.toISOString()}
              >
                <TimeCard
                  time={time}
                  isSelected={
                    time.toLocaleTimeString() === selected?.toLocaleTimeString()
                  }
                  onClick={onTimeClick}
                />
              </Col>
            ))}
        </Row>
      </LoadWrapper>
    </StageLayout>
  );
};
