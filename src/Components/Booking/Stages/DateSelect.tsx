import { Col, Row } from "antd";
import React, { useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import {
  decreaseStep,
  increaseStep,
  setDate,
} from "../../../Utils/redux/bookingSlice";
import { useAppDispatch } from "../../../Utils/redux/store";
import { StageLayout } from "./StageLayout";
import ru from "date-fns/locale/ru";

export const DateSelect: React.FC = () => {
  const dispatch = useAppDispatch();

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);

  const [selected, setSelected] = useState<Date>();

  const onNextClick = () => {
    if (!!selected) {
      dispatch(setDate(selected.toISOString()));
      dispatch(increaseStep());
    }
  };
  const onBackClick = () => {
    dispatch(decreaseStep());
  };

  const onChangeDate = (d: Date) => {
    setSelected(d);
  };
  registerLocale("ru", ru);

  return (
    <StageLayout
      title="Выберите удобный день"
      onNextClick={onNextClick}
      onBackClick={onBackClick}
      isNextBtnActive={!!selected}
    >
      <Row justify="center">
        <Col xs={24} sm={20} md={14} lg={12} xl={10} xxl={8}>
          <ReactDatePicker
            minDate={minDate}
            maxDate={maxDate}
            onChange={onChangeDate}
            selected={selected}
            calendarClassName="datepicker-window"
            renderDayContents={(dayOfMonth, date) => (
              <CustomDay
                dayOfMonth={dayOfMonth}
                date={date as Date}
                maxDate={maxDate}
                minDate={minDate}
                selectedDate={selected}
              />
            )}
            inline
            calendarStartDay={1}
            locale={"ru"}
          />
        </Col>
      </Row>
    </StageLayout>
  );
};

interface CustomDayProps {
  dayOfMonth: number;
  date: Date;
  minDate: Date;
  maxDate: Date;
  selectedDate: Date | undefined;
}
const CustomDay: React.FC<CustomDayProps> = ({
  dayOfMonth,
  date,
  minDate,
  maxDate,
  selectedDate,
}) => {
  const isSelected =
    selectedDate &&
    date.getFullYear() === selectedDate.getFullYear() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getDate() === selectedDate.getDate();
  const isUnselectable = date < minDate || date > maxDate;
  return (
    <div
      className={`datepicker-customDay${
        isUnselectable
          ? " datepicker-customDay-unselectable"
          : isSelected
          ? " datepicker-customDay-selected"
          : ""
      }`}
    >
      <div className="datepicker-customDay-day">{dayOfMonth}</div>
      <div className="datepicker-customDay-places">36 мест</div>
    </div>
  );
};
