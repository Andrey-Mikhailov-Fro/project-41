import React from "react";
import { MobileScaleProps } from "./Block";

export default function MobileScaleButton({ id, active, setActive }: MobileScaleProps) {
  const classes = {
    active: "period active",
    nonActive: "period",
  };

  const isActive = active === id;

  return (
    <span
      key={id}
      className={isActive ? classes.active : classes.nonActive}
      onClick={() => setActive(id)}
    >
      {id}
    </span>
  );
}
