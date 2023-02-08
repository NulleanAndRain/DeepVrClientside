import { Row } from "antd";
import { ColLg } from "../../Common/ColLg";
import { useEffect, useRef, useState } from "react";
import { IGame } from "../../../Utils/types";
import { Api } from "../../../Utils/api";
import { useAppSelector } from "../../../Utils/redux/store";
import { getSelectedCity } from "../../../Utils/redux/authSlice";
import { GameCard } from "../../Common/GameCard";
import { GameModal } from "./GameModal";

import "../GamesStyles.css";

import searchIcon from "../../../Assets/magnifier.svg";
import crossWhite from "../../../Assets/crossWhite.svg";

export const GamesList: React.FC = () => {
  const [games, setGames] = useState<Array<IGame>>();
  const [gamesFiltered, setGamesFiltered] = useState<Array<IGame>>();
  const city = useAppSelector(getSelectedCity);
  const [modalState, setModalState] = useState<IGame | undefined>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchString, setSearchString] = useState<string>();

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Api.setInstanceUrl(city?.code);
    Api.getAllGames()
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setGames(res.data);
          setGamesFiltered(res.data);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const substrings = searchString?.toLocaleLowerCase().split(" ");
    if (substrings)
      setGamesFiltered(
        games?.filter((game) =>
          substrings.every((substring) =>
            game.title.toLocaleLowerCase().includes(substring)
          )
        )
      );
    else setGamesFiltered(games);
  }, [searchString, games]);

  const openModal = (game: IGame) => {
    setModalState(game);
  };

  const closeModal = () => {
    setModalState(undefined);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      searchRef.current?.focus();
    }, 4);
  };

  const onSearch: React.FormEventHandler<HTMLInputElement> = (e) => {
    setSearchString(e.currentTarget.value);
  };

  const onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (!e.currentTarget.value) {
      setIsSearchOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchString(undefined);
    searchRef.current!.value = "";
    setTimeout(() => {
      searchRef.current?.focus();
    }, 4);
  };

  const onSearchBgClick = () => {
    searchRef.current?.focus();
  };

  return (
    <div className="home-wrapper">
      <GameModal game={modalState} isOpen={!!modalState} onClose={closeModal} />
      <Row justify="center" className="header-sticky">
        <ColLg className="home-header">
          <div className="home-subtitle">Игры</div>
          {isSearchOpen ? (
            <div className="home-search-bg" onClick={onSearchBgClick}>
              <input
                className="home-search-input"
                placeholder="Поиск"
                onInput={onSearch}
                onBlur={onBlur}
                ref={searchRef}
              />
              {searchString && (
                <img
                  className="home-search-cross"
                  src={crossWhite}
                  alt="Очистить поиск"
                  onClick={clearSearch}
                />
              )}
            </div>
          ) : (
            <div className="home-search-placeholder" onClick={openSearch} />
          )}
          <img
            src={searchIcon}
            alt="Поиск"
            className="home-title-img home-title-img-search"
            onClick={openSearch}
          />
        </ColLg>
      </Row>
      <Row justify="start" gutter={[20, 20]}>
        {gamesFiltered &&
          gamesFiltered.map((game) => (
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