import { Row } from "antd";
import { ColLg } from "../../Common/Markup/ColLg";
import { useEffect, useRef, useState } from "react";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import {
  getSelectedCity,
  getToken,
  getUser,
  setSelectedCity,
  setToken,
  setUser,
} from "../../../Utils/redux/authSlice";
import { Api } from "../../../Utils/api";
import { BonusCard } from "../Compontents/BonusCrad";
import { HorizontalScrollArea } from "../../Common/Markup/HorizontalScrollArea";
import { OrderInfoRow } from "../Compontents/OrderInfoRow";
import { OrdersAllPopup } from "../Popups/OrdersAllPopup";
import { SettingsPopup } from "../Popups/SettingsPopup";

import "../AccountStyles.css";

import gearIcon from "../../../Assets/gearIcon.svg";
import arrowRight from "../../../Assets/arrow-right.svg";
import logoutIcon from "../../../Assets/logoutIcon.svg";
import logoBonus1 from "../../../Assets/logo-bonus1-light.svg";
import logoBonus2 from "../../../Assets/logo-bonus2-light.svg";
import logoBonus3 from "../../../Assets/logo-bonus3-light.svg";
import { CitySelectPopup } from "../Popups/CitySelectPopup";
import {
  IGetBonusesInfoResponse,
  IOrderHistoryItem,
} from "../../../Utils/types";
import { LoadIcon } from "../../Common/Markup/LoadIcon";

let tempPopups: Array<React.ReactElement> = [];

export const Profile: React.FC = () => {
  const [bonuses, setBonuses] = useState<IGetBonusesInfoResponse>();
  const [history, setHistory] = useState<Array<IOrderHistoryItem>>();
  const [isLoadingBonuses, setIsLoadingBonuses] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingCity, setIsLoadingCity] = useState(false);

  const citySelected = useAppSelector(getSelectedCity);

  const token = useAppSelector(getToken);
  const user = useAppSelector(getUser);

  const dispatch = useAppDispatch();

  const [popupWindows, setPopupWindows] = useState<Array<React.ReactElement>>(
    []
  );

  useEffect(() => {
    setIsLoadingBonuses(true);
    Api.getBonusesInfo({ token })
      .then((res) => {
        setIsLoadingBonuses(false);
        setBonuses(res.data);
      })
      .catch((err) => console.log("error at getBonusesSummary:", err))
      .finally(() => setIsLoadingBonuses(false));

    setIsLoadingHistory(true);
    setIsLoadingCity(true);
    user &&
      Promise.all([
        Api.getHistory(user.id),
        Api.getAllCities(),
        Api.getUserCity(token),
      ])
        .then(([history, cities, selectedCity]) => {
          if (Api.checkStatus(history) && Api.checkStatus(cities)) {
            if (Api.checkStatus(selectedCity)) {
              const c = cities.data.find(
                (d) => d.name === selectedCity.data?.city
              );
              dispatch(setSelectedCity(c));
              setIsLoadingCity(false);
            }
            return Promise.all([
              history.data,
              ...history.data.map((order) => {
                order.location = cities.data.find((c) => order.location_id);
                const ids = JSON.parse(order.games_id) as Array<number>;
                return Promise.all([
                  ...ids.map((gameId) =>
                    Api.getGameInfo(order.location?.code ?? "", gameId)
                  ),
                ]).then((games) => {
                  order.games = games
                    .filter((g) => Api.checkStatus(g))
                    .map((g) => g.data);
                  return order;
                });
              }),
            ]).then(([history]) => {
              setHistory(history);
              setIsLoadingCity(false);
              setIsLoadingHistory(false);
            });
          }
        })
        .catch((err) => console.log("error at getHistory:", err))
        .finally(() => {
          setIsLoadingCity(false);
          setIsLoadingHistory(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bonusesRefs = {
    "1": useRef<HTMLDivElement>(),
    "2": useRef<HTMLDivElement>(),
    "3": useRef<HTMLDivElement>(),
  };

  const logOut = () => {
    dispatch(setUser(undefined));
    dispatch(setToken(undefined));
    Api.logout({ token }).then((res) => {
      if (Api.checkStatus(res)) {
      }
    });
  };

  const lastPopup = popupWindows[(popupWindows.length ?? 0) - 1] ?? undefined;
  tempPopups = popupWindows;

  const addPopup = (elem: React.ReactElement) => {
    const popups = [...tempPopups];
    popups.push(elem);
    setPopupWindows(popups);
  };

  const removeLastPopup = () => {
    let popups = [...tempPopups];
    const newLength = tempPopups.length - 1;
    popups = popups.slice(0, newLength >= 0 ? newLength : 0);
    setPopupWindows(popups);
  };

  return (
    <Row justify="center">
      <ColLg className="profile-wrapper">
        {!!lastPopup ? (
          <>{lastPopup}</>
        ) : (
          <>
            <div className="profile-header">
              Профиль
              <img
                src={gearIcon}
                alt="Открыть настройки профиля"
                className="profile-open-settings-icon"
                onClick={() =>
                  addPopup(
                    <SettingsPopup
                      addPopup={addPopup}
                      onBackClick={removeLastPopup}
                    />
                  )
                }
              />
            </div>
            <div
              className="profile-divide"
              onResize={() => console.log("resize")}
            >
              <div className="profile-divide-header">Баланс</div>
              <LoadWrapper isLoading={isLoadingBonuses} height={1}>
                <HorizontalScrollArea
                  firstElemRef={bonusesRefs["1"]}
                  lastElemRef={bonusesRefs["3"]}
                  viewportClassName="bonus-card-wrapper"
                  wrapperClassName="bonus-card-scroll-root"
                >
                  <BonusCard
                    id="1"
                    cardRef={bonusesRefs["1"]}
                    header="Доступно"
                    value={bonuses?.quantity_all ?? 0}
                    image={logoBonus1}
                  />
                  <BonusCard
                    id="2"
                    cardRef={bonusesRefs["2"]}
                    header="Активно"
                    value={bonuses?.quantity_real ?? 0}
                    image={logoBonus2}
                  />
                  <BonusCard
                    id="3"
                    cardRef={bonusesRefs["3"]}
                    header="Временные"
                    value={bonuses?.quantity_expired ?? 0}
                    description={
                      bonuses?.next_expired_date
                        ? `Бонусы истекают ${bonuses?.next_expired_date}`
                        : undefined
                    }
                    image={logoBonus3}
                  />
                </HorizontalScrollArea>
              </LoadWrapper>
            </div>

            <div className="profile-divide">
              <div className="profile-divide-header">
                <span>Заказы</span>
                <span
                  className="profile-order-info-more"
                  onClick={() => {
                    addPopup(
                      <OrdersAllPopup
                        history={history}
                        onBackClick={removeLastPopup}
                      />
                    );
                  }}
                >
                  Смотреть все
                </span>
              </div>
              <LoadWrapper isLoading={isLoadingHistory} height={1}>
                {history &&
                  history.slice(-3).map((order) => {
                    return <OrderInfoRow order={order} key={order.id} />;
                  })}
              </LoadWrapper>
            </div>

            <div className="profile-divide">
              <div
                className="profile-divide-btn-full"
                onClick={() =>
                  addPopup(<CitySelectPopup onBackClick={removeLastPopup} />)
                }
              >
                <span>Выбрать город</span>
                <span className="profile-divide-header-option">
                  {isLoadingCity ? (
                    <LoadIcon />
                  ) : (
                    <>{citySelected ? citySelected.name : "Не выбрано"}</>
                  )}
                  <img
                    src={arrowRight}
                    alt="Выбрать город"
                    className="profile-divide-header-img"
                  />
                </span>
              </div>
              <div className="divide-line" />
              <div className="profile-divide-btn-full" onClick={logOut}>
                Выйти из аккаунта
                <img
                  src={logoutIcon}
                  alt="Выйти из аккаунта"
                  className="profile-divide-header-img"
                />
              </div>
            </div>
          </>
        )}
      </ColLg>
    </Row>
  );
};
