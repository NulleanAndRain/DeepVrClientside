import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Api } from "../../../Utils/api";
import {
  decreaseStep,
  getRoom,
  increaseStep,
  setGame,
} from "../../../Utils/redux/bookingSlice";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { IGame } from "../../../Utils/types";
import { GameCard } from "../Components/GameCard";
import { StageLayout } from "./StageLayout";

export const GameSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const room = useAppSelector(getRoom);

  const [games, setGames] = useState<Array<IGame>>();

  const [selected, setSelected] = useState<IGame>();

  useEffect(() => {
    Api.getGamesOfRoom(room?.id as number)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) setGames(res.data.games);
      })
      .catch((err) => console.log(err));
  }, [room?.id]);

  const onCardClick = (game: IGame) => {
    setSelected(game);
  };

  const onNextClick = () => {
    if (!!selected) {
      dispatch(setGame(selected));
      dispatch(increaseStep());
    }
  };
  const onBackClick = () => {
    dispatch(decreaseStep());
  };

  return (
    <StageLayout
      title="Выберите VR игру"
      onNextClick={onNextClick}
      onBackClick={onBackClick}
      isNextBtnActive={!!selected}
    >
      <Row justify="start" gutter={[20, 20]}>
        {games &&
          games.map((game) => (
            <Col xs={12} sm={8} md={6} lg={6} xl={4} xxl={4} key={game.id}>
              <GameCard
                game={game}
                isSelected={selected?.id === game.id}
                onClick={onCardClick}
              />
            </Col>
          ))}
      </Row>
    </StageLayout>
  );
};
