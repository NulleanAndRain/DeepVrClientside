import { Api } from "../../../Utils/api";
import { IGame } from "../../../Utils/types";
import "../BookingStyles.css";
import { SelectedMark } from "./SelectedMark";

interface Props {
  game: IGame;
  isSelected?: boolean;
  onClick: (game: IGame) => void;
}

export const GameCard: React.FC<Props> = ({ game, isSelected, onClick }) => {
  const imgUrl = Api.getImageUrl(game.logo);
  return (
    <div
      className={`game-card-wrapper selectable-card-wrapper${
        isSelected ? " selectable-card-wrapper-selected" : ""
      }`}
      onClick={() => onClick(game)}
    >
      <div
        className="selectable-card-bg game-card-bg"
        style={{ backgroundImage: `url(${imgUrl})` }}
      >
        <h2 className="game-card-title"> {game.title} </h2>
        <SelectedMark isSelected={!!isSelected} />
      </div>
    </div>
  );
};
