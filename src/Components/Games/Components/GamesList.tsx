import { Row } from "antd";
import { ColLg } from "../../Common/ColLg";
import { useEffect, useState } from "react";
import { IGame } from "../../../Utils/types";
import { Api } from "../../../Utils/api";
import { useAppSelector } from "../../../Utils/redux/store";
import { getSelectedCity } from "../../../Utils/redux/authSlice";
import { GameCard } from "../../Common/GameCard";
import { GameModal } from "./GameModal";

import "../GamesStyles.css";

import searchIcon from "../../../Assets/magnifier.svg";

export const GamesList: React.FC = () => {
  const [games, setGames] = useState<Array<IGame>>();
  const city = useAppSelector(getSelectedCity);
  const [modalState, setModalState] = useState<IGame | undefined>();

  useEffect(() => {
    Api.setInstanceUrl(city?.code);
    Api.getAllGames()
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setGames(res.data);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (game: IGame) => {
    setModalState(game);
  };

  const closeModal = () => {
    setModalState(undefined);
  };

  return (
    <div className="home-wrapper">
      <GameModal game={modalState} isOpen={!!modalState} onClose={closeModal} />
      <Row justify="center" className="header-sticky">
        <ColLg className="home-header">
          <div className="home-subtitle">Игры</div>
          <img src={searchIcon} alt="Поиск" className="home-title-img " />
        </ColLg>
      </Row>
      <Row justify="start" gutter={[20, 20]}>
        {games &&
          games.map((game) => (
            <GameCard
              game={game}
              isSelected={false}
              key={game.id}
              onClick={openModal}
            />
          ))}
      </Row>
    </div>
  );
};
