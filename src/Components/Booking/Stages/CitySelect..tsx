import { Col, Row } from "antd";
import { FixedPanel } from "../Components/FixedPanel";
import { NextButton } from "../../Common/Markup/NextButton";
import { Title } from "../Components/Title";
import { useEffect, useState } from "react";
import { ICity } from "../../../Utils/types";
import { Api } from "../../../Utils/api";
import { CityCard } from "../Components/CityCard";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import {
  getCity,
  increaseStep,
  setCity,
} from "../../../Utils/redux/bookingSlice";
import { getSelectedCity } from "../../../Utils/redux/authSlice";
import { LoadWrapper } from "../../Common/Markup/LoadWrapper";

import "../BookingStyles.css";

export const CitySelect: React.FC = () => {
  const [cities, setCities] = useState<Array<ICity>>();
  const selectedCityProfile = useAppSelector(getSelectedCity) as ICity;
  const selectedCity =
    (useAppSelector(getCity) as ICity) ?? selectedCityProfile;
  const [selected, setSelected] = useState<ICity>();

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setSelected(undefined);
    Api.getAllCities()
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setCities(res.data);
          if (!res.data.find((c) => c.id === selectedCity?.id)) {
            dispatch(setCity(undefined));
          } else {
            setSelected(selectedCity);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCity = (city: ICity) => {
    setSelected(city);
  };

  const onNextClick = () => {
    if (selected) {
      dispatch(setCity(selected));
      dispatch(increaseStep());
    }
  };

  return (
    <>
      <div className="booking-viewport ">
        <Title fontSize={32}>Адреса</Title>

        <LoadWrapper isLoading={isLoading}>
          <Row justify="start" gutter={[20, 20]}>
            {cities?.map((city) => (
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={8}
                xxl={8}
                key={city.code}
              >
                <CityCard
                  city={city}
                  onClick={selectCity}
                  isSelected={selected?.code === city.code}
                />
              </Col>
            ))}
          </Row>
        </LoadWrapper>
      </div>
      <FixedPanel>
        <Col xs={24} sm={20} md={18} lg={16} xl={14} xxl={12}>
          <NextButton onClick={onNextClick} isActive={!!selected}>
            Выбрать
          </NextButton>
        </Col>
      </FixedPanel>
    </>
  );
};
