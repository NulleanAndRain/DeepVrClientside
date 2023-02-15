import { Row } from "antd";
import { ColLg } from "../../Common/Markup/ColLg";
import { useCallback, useEffect, useRef, useState } from "react";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { getToken, setToken, setUser } from "../../../Utils/redux/authSlice";
import { Api } from "../../../Utils/api";
import { BonusCard } from "../Compontents/BonusCrad";
import { HorizontalScrollArea } from "../../Common/Markup/HorizontalScrollArea";

import "../AccountStyles.css";

import gearIcon from "../../../Assets/gearIcon.svg";
import logoutIcon from "../../../Assets/logoutIcon.svg";
import { OrderInfoRow } from "../Compontents/OrderInfoRow";
import { OrdersAllPopup } from "../Popups/OrdersAllPopup";
import { SettingsPopup as SettingsPopup } from "../Popups/SettingsPopup";

let tempPopups: Array<React.ReactElement> = [];

export const Profile: React.FC = () => {
  const [bonuses, setBonuses] = useState<any>();
  const [history, setHistory] = useState<Array<any>>();
  const [isLoading, setIsLoading] = useState(false);

  const token = useAppSelector(getToken);

  const dispatch = useAppDispatch();

  const [popupWindows, setPopupWindows] = useState<Array<React.ReactElement>>(
    []
  );

  useEffect(() => {
    if (isLoading) return;
    setIsLoading(true);
    let bonusesLoaded = false,
      historyLoaded = false;
    Api.getBonusesInfo({ token })
      .then((res) => {
        console.log("bonuses: ", res);
        bonusesLoaded = true;
        if (bonusesLoaded && historyLoaded) setIsLoading(false);
      })
      .catch((err) => console.log("error at getBonusesSummary:", err))
      .finally(() => setIsLoading(false));

    Api.getHistory({ token })
      .then((res) => {
        console.log("history", res);
        historyLoaded = true;
        if (bonusesLoaded && historyLoaded) setIsLoading(false);
      })
      .catch((err) => console.log("error at getHistory:", err))
      .finally(() => setIsLoading(false));
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
            <LoadWrapper isLoading={isLoading} height={1} />
            <div
              className="profile-divide"
              onResize={() => console.log("resize")}
            >
              <div className="profile-divide-header">Баланс</div>
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
                  value={3400}
                />
                <BonusCard
                  id="2"
                  cardRef={bonusesRefs["2"]}
                  header="Активно"
                  value={1000}
                />
                <BonusCard
                  id="3"
                  cardRef={bonusesRefs["3"]}
                  header="Временные"
                  value={2400}
                  description="Бонусы истекаю дд.мм.гг"
                />
              </HorizontalScrollArea>
            </div>

            <div className="profile-divide">
              <div className="profile-divide-header">
                <span>Заказы</span>
                <span
                  className="profile-order-info-more"
                  onClick={() => {
                    addPopup(<OrdersAllPopup onBackClick={removeLastPopup} />);
                  }}
                >
                  Смотреть все
                </span>
              </div>
              <OrderInfoRow />
            </div>

            <div className="profile-divide">
              <div className="profile-divide-header profile-divide-header-btn-full">
                Выбрать город
              </div>
              <div className="divide-line" />
              <div
                className="profile-divide-header profile-divide-header-btn-full"
                onClick={logOut}
              >
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
