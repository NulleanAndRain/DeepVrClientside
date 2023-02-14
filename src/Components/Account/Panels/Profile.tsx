import { Row } from "antd";
import { ColLg } from "../../Common/Markup/ColLg";
import { useEffect, useRef, useState } from "react";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";
import { useAppSelector } from "../../../Utils/redux/store";
import { getToken } from "../../../Utils/redux/authSlice";
import { Api } from "../../../Utils/api";
import { BonusCard } from "../Compontents/BonusCrad";

import "../AccountStyles.css";

import gearIcon from "../../../Assets/gearIcon.svg";
import { HorizontalScrollArea } from "../../Common/Markup/HorizontalScrollArea";

export const Profile: React.FC = () => {
  const [bonuses, setBonuses] = useState<any>();
  const [history, setHistory] = useState<Array<any>>();
  const [isLoading, setIsLoading] = useState(false);

  const token = useAppSelector(getToken);

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
  }, []);

  const bonusesRefs = {
    "1": useRef<HTMLDivElement>(),
    "2": useRef<HTMLDivElement>(),
    "3": useRef<HTMLDivElement>(),
  };

  return (
    <Row justify="center">
      <ColLg className="profile-wrapper">
        <div className="profile-header">
          Профиль
          <img
            src={gearIcon}
            alt="Открыть настройки профиля"
            className="profile-open-settings-icon"
          />
        </div>
        <LoadWrapper isLoading={isLoading} height={1} />
        <div className="profile-divide">
          <div className="profile-divide-header">Баланс</div>
          <HorizontalScrollArea
            firstElemRef={bonusesRefs["1"]}
            lastElemRef={bonusesRefs["3"]}
            viewportClassName="bonus-card-wrapper"
            wrapperClassName="bonus-card-scroll-root"
          >
            <BonusCard id="1" cardRef={bonusesRefs["1"]} />
            <BonusCard id="2" cardRef={bonusesRefs["2"]} />
            <BonusCard id="3" cardRef={bonusesRefs["3"]} />
          </HorizontalScrollArea>
        </div>
      </ColLg>
    </Row>
  );
};
