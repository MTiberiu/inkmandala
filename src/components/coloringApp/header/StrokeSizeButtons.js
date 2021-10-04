import React, { useState } from "react";
import HeaderAppButton from "../HeaderAppButton";
import { useStroke } from "../EventsContext";
const StrokeSizeButtons = (param) => {
  const [activeStrokeButton, setActiveStrokeButton] = useState("0");
  const SELECTED = param.selected;
  const changeStrokeSize = useStroke();

  const setActivStrokeHandler = (e) => {
    setActiveStrokeButton(e.target.id);
    changeStrokeSize(e.target.id);
  };
  return (
    <>
      <HeaderAppButton
        className={`mode-stroke ${
          activeStrokeButton === SELECTED.REMOVE ? "active" : ""
        }`}
        id={0}
        title={"Select Remove Outlines"}
        icoHref={"#icon-remove-outlines"}
        setActive={setActivStrokeHandler}
      />
      <HeaderAppButton
        className={`mode-stroke ${
          activeStrokeButton === SELECTED.ONE ? "active" : ""
        }`}
        id={1}
        title={"Select Icon Stroke Size One"}
        icoHref={"#icon-stroke-size-one"}
        setActive={setActivStrokeHandler}
      />

      <HeaderAppButton
        className={`mode-stroke ${
          activeStrokeButton === SELECTED.TWO ? "active" : ""
        }`}
        id={2}
        title={"Select Icon Stroke Size Two"}
        icoHref={"#icon-stroke-size-two"}
        setActive={setActivStrokeHandler}
      />
      <HeaderAppButton
        className={`mode-stroke ${
          activeStrokeButton === SELECTED.THREE ? "active" : ""
        }`}
        id={3}
        title={"Select Icon Stroke Size Three"}
        icoHref={"#icon-stroke-size-three"}
        setActive={setActivStrokeHandler}
      />

      <HeaderAppButton
        className={`mode-stroke ${
          activeStrokeButton === SELECTED.LOKED ? "active" : ""
        }`}
        id={"locked"}
        title={"Lock Strokes Size"}
        icoHref={"#icon-locked"}
        setActive={setActivStrokeHandler}
      />
    </>
  );
};
export default StrokeSizeButtons;
