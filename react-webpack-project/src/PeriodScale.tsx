import React from "react";
import { PeriodScaleProps } from "./Block";
import useWindowSize from "./useWindowSize";

export default function PeriodScale({
  id,
  active,
  setPeriod,
  number,
  rotation,
}: PeriodScaleProps) {
  const classes = {
    active: "period active",
    nonActive: "period",
  };

  const { width, height } = useWindowSize();

  const angle = (360 / number) * (id + 1);

  const radiusMd = width * 0.3 / 2;
  const radiusXl = width * 0.4 / 2;

  const radius = (width > 1440) && (height > 1080) ? radiusXl : radiusMd; 

  const x = radius * Math.cos((-angle * Math.PI) / 180);
  const y = radius * Math.sin((-angle * Math.PI) / 180);

  const isActive = active === id;

  return (
    <span
      key={id}
      className={isActive ? classes.active : classes.nonActive}
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${-rotation}deg)`,
      }}
      onClick={() => setPeriod(id)}
    >
      <span style={{ position: "fixed" }}>{id}</span>
    </span>
  );
}
