import { getCurrentStep } from "../../Utils/redux/bookingSlice";
import { useAppSelector } from "../../Utils/redux/store";
import { DefaultLayout } from "../Layout/DefaultLayout";
import "./BookingStyles.css";
import { CitySelect } from "./Stages/CitySelect.";
import { ConfirmBooking } from "./Stages/ConfirmBooking";
import { CredentialsForm } from "./Stages/CredentialsForm";
import { DateSelect } from "./Stages/DateSelect";
import { GameSelect } from "./Stages/GameSelect";
import { PlayersCountSelect } from "./Stages/PlayersCountSelect";
import { RoomSelect } from "./Stages/RoomSelect";
import { TimeSelect } from "./Stages/TimeSelect";

export const Booking: React.FC = () => {
  const currentStep = useAppSelector(getCurrentStep);

  const CurrentPanel = () => {
    switch (currentStep) {
      case 0:
        return <CitySelect />;
      case 1:
        return <RoomSelect />;
      case 2:
        return <GameSelect />;
      case 3:
        return <PlayersCountSelect />;
      case 4:
        return <DateSelect />;
      case 5:
        return <TimeSelect />;
      case 6:
        return <CredentialsForm />;
      case 7:
        return <ConfirmBooking />;
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
