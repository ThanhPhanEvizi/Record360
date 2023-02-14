import React, { useEffect, useRef, useState } from "react";
import { Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

type LoadingBarRef = {
  add(value: number): void;
  decrease(value: number): void;
  continuousStart(startingValue?: number, refreshRate?: number): void;
  staticStart(startingValue: number): void;
  complete(): void;
};

export const CustomSwitch = ({ children }: any) => {
  const ref = useRef<LoadingBarRef>(null);

  return (
    <>
      <Switch>{children}</Switch>
    </>
  );
};
