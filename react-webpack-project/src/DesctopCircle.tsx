import { TransitionGroup, CSSTransition } from "react-transition-group";
import { DesctopProps } from "./Block";
import PeriodScale from "./PeriodScale";
import { periods } from "./usefullData";
import React from "react";

export default function DesctopElement({
  active,
  setActive,
  rotation,
}: DesctopProps) {
  return (
    <TransitionGroup component="div" className="scale-container" >
      <CSSTransition key={'circle'} timeout={500} classNames="rotate">
        <div
          className="scale"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {periods.map((gap) => (
            <PeriodScale
              id={gap.id}
              active={active}
              setPeriod={setActive}
              number={periods.length}
              rotation={rotation}
            />
          ))}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
