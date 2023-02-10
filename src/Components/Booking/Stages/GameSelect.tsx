import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Api } from "../../../Utils/api";
import {
  decreaseStep,
  getGame,
  getRoom,
  increaseStep,
  setGame,
} from "../../../Utils/redux/bookingSlice";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { IGame } from "../../../Utils/types";
import { GameCard } from "../../Common/GameCard";
import { StageLayout } from "./StageLayout";
import { LoadWrapper } from "../../Common/LoadWrapper";

import "../BookingStyles.css";

export const GameSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const room = useAppSelector(getRoom);
  const selectedGame = useAppSelector(getGame);

  const [games, setGames] = useState<Array<IGame>>();

  const [selected, setSelected] = useState<IGame | undefined>(
    useAppSelector(getGame) as IGame
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setSelected(undefined);
    Api.getGamesOfRoom(room?.id as number)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setGames(res.data.games);
          if (selectedGame) {
            if (!res.data.games.find((game) => game.id === selectedGame.id)) {
              dispatch(setGame(undefined));
            } else {
              setSelected(selectedGame);
            }
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <LoadWrapper isLoading={isLoading}>
        <Row justify="start" gutter={[20, 20]}>
          {games &&
            games.map((game) => (
              <GameCard
                game={game}
                isSelected={selected?.id === game.id}
                onClick={onCardClick}
                key={game.id}
              />
            ))}
        </Row>
      </LoadWrapper>
    </StageLayout>
  );
};
