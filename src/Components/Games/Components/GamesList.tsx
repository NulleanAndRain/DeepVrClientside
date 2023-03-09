import { Row } from "antd";
import { ColLg } from "../../Common/Markup/ColLg";
import { useEffect, useRef, useState } from "react";
import { IGame } from "../../../Utils/types";
import { Api } from "../../../Utils/api";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import {
  getSelectedCity,
  setSelectedCity,
} from "../../../Utils/redux/authSlice";
import { GameCard } from "../../Common/Markup/GameCard";
import { GameModal } from "./GameModal";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";

import "../GamesStyles.css";

import searchIcon from "../../../Assets/magnifier.svg";
import crossWhite from "../../../Assets/crossWhite.svg";
import arrowRight from "../../../Assets/arrow-right.svg";

export const GamesList: React.FC = () => {
  const [games, setGames] = useState<Array<IGame>>();
  const [gamesFiltered, setGamesFiltered] = useState<Array<IGame>>();
  const city = useAppSelector(getSelectedCity);
  const [modalState, setModalState] = useState<IGame | undefined>();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchString, setSearchString] = useState<string>();

  const [isLoading, setIsLoading] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    Api.setInstanceUrl(city?.code);
    Api.getAllGames()
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setGames(res.data);
          setGamesFiltered(res.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
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

  const resetCity = () => {
    dispatch(setSelectedCity(undefined));
  };

  return (
    <div className="home-wrapper">
      <GameModal game={modalState} isOpen={!!modalState} onClose={closeModal} />
      <Row justify="center" className="header-sticky">
        <ColLg className="home-header-wrapper">
          <div className="home-header">
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
          </div>
          <div className="home-subheader">
            <div>
              Выбрано: <span className="home-subheader-city">{city?.name}</span>
            </div>
            <div className="home-subheader-change-city" onClick={resetCity}>
              Выбрать другой город
              <img src={arrowRight} className="" alt="" />
            </div>
          </div>
        </ColLg>
      </Row>
      <LoadWrapper isLoading={isLoading}>
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
      </LoadWrapper>
    </div>
  );
};
