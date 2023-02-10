import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import {
  decreaseStep,
  getRoom,
  increaseStep,
  setRoom,
} from "../../../Utils/redux/bookingSlice";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { IRoom } from "../../../Utils/types";
import { Api } from "../../../Utils/api";
import { RoomCard } from "../Components/RoomCard";
import { StageLayout } from "./StageLayout";
import { LoadWrapper } from "../../Common/LoadWrapper";

import "../BookingStyles.css";

export const RoomSelect: React.FC = () => {
  const dispatch = useAppDispatch();

  const [rooms, setRooms] = useState<Array<IRoom>>();

  const selectedRoom = useAppSelector(getRoom) as IRoom;
  const [selected, setSelected] = useState<IRoom>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelected(undefined);
    setIsLoading(true);
    Api.getAllRooms()
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setRooms(res.data);
          if (!res.data.find((r) => r.id === selectedRoom.id)) {
            dispatch(setRoom(undefined));
          } else {
            setSelected(selectedRoom);
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <LoadWrapper isLoading={isLoading}>
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
      </LoadWrapper>
    </StageLayout>
  );
};
