import React from "react";
import { MobileElementProps } from "./Block";
import MobileScaleButton from "./MobileScaleButton";
import { periods } from "./usefullData";

export default function MobileScale({ active, setActive }: MobileElementProps) {
    return (
      <div className="scale-container">
        <div className="scale">
          {periods.map((gap) => (
            <MobileScaleButton
              id={gap.id}
              active={active}
              setActive={setActive}
            />
          ))}
      </div>
      </div>
    );
  };