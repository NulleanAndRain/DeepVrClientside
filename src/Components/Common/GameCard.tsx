import { Col } from "antd";
import { Api } from "../../Utils/api";
import { IGame } from "../../Utils/types";
import { SelectedMark } from "../Booking/Components/SelectedMark";
import "./CommonStyles.css";

interface Props {
  game: IGame;
  isSelected?: boolean;
  onClick?: (game: IGame) => void;
}

export const GameCard: React.FC<Props> = ({ game, isSelected, onClick }) => {
  const imgUrl = Api.getImageUrl(game.logo);
  return (
    <Col xs={12} sm={8} md={6} lg={6} xl={4} xxl={4}>
      <div
        className={`game-card-wrapper selectable-card-wrapper${
          isSelected ? " selectable-card-wrapper-selected" : ""
        }`}
        onClick={onClick ? () => onClick(game) : undefined}
      >
        <div
          className="selectable-card-bg game-card-bg"
          style={game.logo ? { backgroundImage: `url(${imgUrl})` } : undefined}
        >
          <h2 className="game-card-title"> {game.title} </h2>
          <SelectedMark isSelected={!!isSelected} />
        </div>
      </div>
    </Col>
  );
};
