import { Modal } from "antd";
import { IGame } from "../../../Utils/types";
import { NextButton } from "../../Common/NextButton";
import {
  Root as ScrollRoot,
  Scrollbar,
  Thumb,
  Viewport,
} from "@radix-ui/react-scroll-area";

import playersIcon from "../../../Assets/console 1.svg";
import timeIcon from "../../../Assets/clock 1.svg";
import ageIcon from "../../../Assets/vr-glasses 2.svg";

import "../GamesStyles.css";
import { Api } from "../../../Utils/api";

interface Props {
  game?: IGame;
  isOpen: boolean;
  onClose: () => void;
}

export const GameModal: React.FC<Props> = ({ game, isOpen, onClose }) => {
  const bookGame = () => {
    console.log(`book game id`, game?.id);
  };
  const Footer = () => {
    return (
      <div className="game-modal-footer">
        <NextButton onClick={bookGame} isActive>
          Забронировать
        </NextButton>
      </div>
    );
  };
  return (
    <>
      {!!game && (
        <Modal
          open={isOpen}
          onCancel={onClose}
          footer={<Footer />}
          title={null}
          closable={false}
        >
          <ScrollRoot type="auto" className="ScrollAreaRoot">
            <Viewport className="ScrollAreaViewport">
              <div className="game-modal-viewport game-modal-container">
                <div className="game-modal-header">{game.title}</div>
                <div className="game-modal-params-row">
                  <div className="game-modal-param">
                    <img
                      className="game-modal-param-img"
                      src={playersIcon}
                      alt="Количество игроков"
                    />
                    {game.guest_min || game.guest_max
                      ? game.guest_max && game.guest_min
                        ? game.guest_min === game.guest_max
                          ? game.guest_min
                          : `${game.guest_min}-${game.guest_max}`
                        : game.guest_min
                        ? `${game.guest_min}+`
                        : `до ${game.guest_max}`
                      : "?"}
                  </div>
                  <div className="game-modal-param">
                    <img
                      className="game-modal-param-img"
                      src={timeIcon}
                      alt="Примерное время"
                    />
                    {game.time_duration}
                  </div>
                  <div className="game-modal-param">
                    <img
                      className="game-modal-param-img"
                      src={ageIcon}
                      alt="Возраст игроков"
                    />
                    {game.age_limit ? `${game.age_limit}+` : "0+"}
                  </div>
                </div>
                <div className="game-modal-image-wrapper">
                  <img
                    src={Api.getImageUrl(game.logo) as string}
                    alt={game.title}
                    className="game-modal-image"
                  />
                </div>
                <div className="game-modal-stat-row">
                  <span>Жанр:</span>
                  <span className="game-modal-stat-row-value">
                    {game.genre}
                  </span>
                </div>
                <div className="game-modal-stat-row">
                  <span>
                    {(game.rooms?.length ?? 0) > 1 ? "Залы:" : "Зал: "}
                  </span>
                  <div className="game-modal-stat-row-several-values">
                    {game.rooms?.map((r) => (
                      <span className="game-modal-stat-row-value">
                        {r.title}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="game-modal-description">{game.description}</div>
              </div>
            </Viewport>
            <Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
              <Thumb className="ScrollAreaThumb" />
            </Scrollbar>
          </ScrollRoot>
        </Modal>
      )}
    </>
  );
};
