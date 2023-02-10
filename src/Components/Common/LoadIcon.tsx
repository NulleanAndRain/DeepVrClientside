import loadIcon from "../../Assets/load.svg";

export const LoadIcon: React.FC = () => {
  return (
    <div className="load-icon-container-wrapper load-icon-container">
      <img src={loadIcon} alt="load" className="load-icon" />
    </div>
  );
};
