import loadIcon from "../../Assets/load.svg";
import { IChildren } from "../../Utils/types";

interface Props {
  children?: IChildren;
  isLoading: boolean;
}
export const LoadWrapper: React.FC<Props> = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <div className="load-icon-container-lg-wrapper">
          <div className="load-icon-container">
            <img src={loadIcon} alt="load" className="load-icon load-icon-lg" />
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
