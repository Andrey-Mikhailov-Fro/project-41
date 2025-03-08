import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FreeMode, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import end from "../public/scrollToEnd.svg";
import left from "../public/switchBtnLeft.svg";
import right from "../public/switchBtnRight.svg";
import "./Block.scss";
import DesctopElement from "./DesctopCircle";
import MobileScale from "./MobileScale";
import { Event, events, Period, periods } from "./usefullData";
import useWindowSize from "./useWindowSize";

export type EventCardProps = {
  eventOfYear: Event;
};

export type PeriodScaleProps = {
  id: number;
  active: number;
  setPeriod: React.Dispatch<React.SetStateAction<number>>;
  number: number;
  rotation: number;
};

export type DesctopProps = {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  rotation: number;
};

export type MobileElementProps = {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

export type MobileScaleProps = {
  id: number;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

export default function Block() {
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const { width } = useWindowSize();
  const swiperRef = useRef<any>(null);

  const period = periods.find((item) => item.id === currentPeriod) as Period;
  const actualEvents = events.filter(
    (event) => period?.start <= event.year && event.year <= period?.end
  );

  const [startYear, setStartYear] = useState(period.start);
  const [endYear, setEndYear] = useState(period.end);

  const equalize = (
    edge: number,
    setEdge: React.Dispatch<React.SetStateAction<number>>,
    type: keyof Pick<Period, "start" | "end">
  ) => {
    if (edge === period[type]) return edge;

    if (edge < period[type]) {
      for (let i = 0; i < period[type] - edge; i++) {
        setTimeout(() => setEdge(edge + 1), 1);
      }
    }

    if (edge > period[type]) {
      for (let i = 0; i < edge - period[type]; i++) {
        setTimeout(() => setEdge(edge - 1), 1);
      }
    }

    return edge;
  };

  const calculateRotation = (index: number) => {
    const totalItems = periods.length;
    const anglePerItem = 360 / totalItems;
    let rotation = index * anglePerItem;

    if (rotation > 180) {
      rotation -= 360;
    } else if (rotation < -180) {
      rotation += 360;
    }

    return rotation;
  };

  const rotation = calculateRotation(currentPeriod);

  const toScreenStart = equalize(startYear, setStartYear, "start");
  const toScreenEnd = equalize(endYear, setEndYear, "end");

  const isMax = currentPeriod === periods.length;
  const isMin = currentPeriod === 1;

  const handleIncrement = () => {
    if (isMax) return;
    setCurrentPeriod(currentPeriod + 1);
  };

  const handleDecrement = () => {
    if (isMin) return;
    setCurrentPeriod(currentPeriod - 1);
  };

  const EventCard = ({ eventOfYear }: EventCardProps) => {
    return (
      <div key={eventOfYear.id}>
        <h3 className="event-card-header">{eventOfYear.year}</h3>
        <p className="event-card-description">{eventOfYear.description}</p>
      </div>
    );
  };

  return (
    <>
      <h1 className="header">
        <div className="header-decoration" />
        <span>Исторические даты</span>
      </h1>
      <div className="interactions">
        <div className="interactions-years">
          <span className="year year-start">{toScreenStart}</span>
          <span className="year year-end">{toScreenEnd}</span>
        </div>
        <div className="event">
          <h2 key={period.category} className="event-header">
            {period.category}
          </h2>
          <div style={{ paddingLeft: "10%" }}>
            <Swiper
              ref={swiperRef}
              modules={[Navigation, FreeMode]}
              spaceBetween={50}
              slidesPerView={3}
              navigation={{
                enabled: true,
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              freeMode
              breakpoints={{
                320: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {actualEvents.map((event) => (
                <SwiperSlide>
                  <EventCard eventOfYear={event} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              className="swiper-button-next"
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.swiper.slideTo(swiperRef.current.swiper.slides.length - 1);
                }
              }}
            >
              <img src={end} alt="scrl" />
            </div>
            <div className="swiper-button-prev" onClick={() => {
                console.log(swiperRef);
                if (swiperRef.current) {
                  swiperRef.current.swiper.slideTo(0);
                }
              }}>
              <img src={end} alt="scrl" />
            </div>
          </div>
        </div>
        <div className="switcher">
          <div style={{ width: "fit-content", height: "fit-content" }}>
            <span className="switcher-count">0{currentPeriod}/06</span>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                className="switcher-btn"
                onClick={() => handleDecrement()}
                disabled={isMin}
              >
                <img alt="sw" src={left} />
              </button>
              <button
                className="switcher-btn"
                onClick={() => handleIncrement()}
                disabled={isMax}
              >
                <img alt="sw" src={right} />
              </button>
            </div>
          </div>
        </div>
        {width < 1024 ? (
          <MobileScale active={currentPeriod} setActive={setCurrentPeriod} />
        ) : (
          <DesctopElement
            active={currentPeriod}
            setActive={setCurrentPeriod}
            rotation={rotation}
          />
        )}
        <h2 key={"lg" + period.category} className="event-header-lg">
          {period.category}
        </h2>
      </div>
      <hr className="line-vertical" />
      <hr className="line-horisontal" />
    </>
  );
}
