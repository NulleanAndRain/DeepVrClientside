import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import {
  decreaseStep,
  getCurrentStep,
  increaseStep,
  setRoom,
} from "../../../Utils/redux/bookingSlice";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { FixedPanel } from "../Components/FixedPanel";
import { NextButton } from "../Components/NextButton";
import { StepDisplay } from "../Components/StepDisplay";
import { Title } from "../Components/Title";

import "../BookingStyles.css";
import { BackButton } from "../Components/BackButton";
import { IRoom } from "../../../Utils/types";
import { Api } from "../../../Utils/api";
import { RoomCard } from "../Components/RoomCard";
import { StageLayout } from "./StageLayout";

const mockRooms = [
  { id: 1, title: "Full Bodey", guest_max: 4 },
  { id: 2, title: "Freeroam", guest_max: 4 },
  { id: 3, title: "Classic", guest_max: 6 },
  {
    id: 5,
    title:
      "\u041b\u0430\u0443\u043d\u0436 \u0437\u043e\u043d\u0430 \u0412\u0445\u043e\u0434",
    guest_max: 10,
  },
  {
    id: 6,
    title:
      "\u041b\u0430\u0443\u043d\u0436 \u0437\u043e\u043d\u0430 \u0417\u043e\u043c\u0431\u0438",
    guest_max: 10,
  },
];

export const RoomSelect: React.FC = () => {
  const dispatch = useAppDispatch();

  const [rooms, setRooms] = useState<Array<IRoom>>();

  const [selected, setSelected] = useState<IRoom>();

  useEffect(() => {
    Api.getAllRooms()
      .then((res) => {
        if (res.status >= 200 && res.status < 300) setRooms(res.data);
      })
      .catch((err) => console.log(err));
    // setRooms(mockRooms);
  }, []);

  const onCardClick = (room: IRoom) => {
    setSelected(room);
  };

  const onNextClick = () => {
    if (!!selected) {
      dispatch(setRoom(selected));
      dispatch(increaseStep());
    }
  };
  const onBackClick = () => {
    dispatch(decreaseStep());
  };

  return (
    <StageLayout
      title="StageLayout"
      onNextClick={onNextClick}
      onBackClick={onBackClick}
      isNextBtnActive={!!selected}
    >
      <Row justify="start" gutter={[20, 20]}>
        {rooms &&
          rooms.map((room) => (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={room.id}>
              <RoomCard
                room={room}
                isSelected={selected?.id === room.id}
                onClick={onCardClick}
              />
            </Col>
          ))}
      </Row>
    </StageLayout>
  );
};
