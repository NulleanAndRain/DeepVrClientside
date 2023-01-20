import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import {
  decreaseStep,
  increaseStep,
  setRoom,
} from "../../../Utils/redux/bookingSlice";
import { useAppDispatch } from "../../../Utils/redux/store";
import { IRoom } from "../../../Utils/types";
import { Api } from "../../../Utils/api";
import { RoomCard } from "../Components/RoomCard";
import { StageLayout } from "./StageLayout";

import "../BookingStyles.css";

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
      title="Выберите VR Комнату"
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
