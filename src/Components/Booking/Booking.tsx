import { getCurrentStep } from "../../Utils/redux/bookingSlice";
import { useAppSelector } from "../../Utils/redux/store";
import { DefaultLayout } from "../Layout/DefaultLayout";
import "./BookingStyles.css";
import { CitySelect } from "./Stages/CitySelect.";
import { RoomSelect } from "./Stages/RoomSelect";

export const Booking: React.FC = () => {
  const currentStep = useAppSelector(getCurrentStep);

  const CurrentPanel = () => {
    switch (currentStep) {
      case 0:
        return <CitySelect />;
      case 1:
        return <RoomSelect />;
      default:
        return null;
    }
  };

  return (
    <DefaultLayout>
      <div className="booking-wrapper">
        <CurrentPanel />
      </div>
    </DefaultLayout>
  );
};
