import { Col, Row } from "antd";
import { FixedPanel } from "../Components/FixedPanel";
import { NextButton } from "../Components/NextButton";
import "../BookingStyles.css";
import { Title } from "../Components/Title";
import { useEffect, useState } from "react";
import { ICity } from "../../../Utils/types";
import { Api } from "../../../Utils/api";
import { CityCard } from "../Components/CityCard";
import { useAppDispatch } from "../../../Utils/redux/store";
import { increaseStep, setCity } from "../../../Utils/redux/bookingSlice";

export const CitySelect: React.FC = () => {
  const [cities, setCities] = useState<Array<ICity>>();
  const [selected, setSelected] = useState<ICity>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    Api.getAllCities()
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setCities(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        <Title>Адреса</Title>
        <Row justify="center" gutter={[20, 20]}>
          {cities?.map((city) => (
            <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={city.code}>
              <CityCard
                city={city}
                onClick={selectCity}
                isSelected={selected?.code === city.code}
              />
            </Col>
          ))}
        </Row>
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
