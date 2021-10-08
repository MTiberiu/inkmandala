import React, { useState } from "react";
import HeaderAppButton from "../HeaderAppButton";
import { useSelected, useBoth } from "../EventsContext";
const ModeButons = (param) => {
  const [activeSelectedButton, setActiveSelectedButton] = useState("fill");
  const changeSelected = useSelected();
  const changeToBoth = useBoth();
  const SELECTED = param.selected;
  const setModeHandler = (e) => {
    setActiveSelectedButton(e.target.id);
    changeSelected(e.target.id);
  };

  const setBothHandler = (e) => {
    setActiveSelectedButton(e.target.id);
    changeToBoth(e.target.id);
  };
  return (
    <>
      <HeaderAppButton
        className={`mode ${
          activeSelectedButton === SELECTED.PATH ? "active" : ""
        }`}
        id={"fill"}
        title={"Select Path"}
        icoHref={"#icon-select-path"}
        setActive={setModeHandler}
      />

      <HeaderAppButton
        className={`mode ${
          activeSelectedButton === SELECTED.STROKE ? "active" : ""
        }`}
        id={"stroke"}
        title={"Select Outline"}
        icoHref={"#icon-outline"}
        setActive={setModeHandler}
      />

      <HeaderAppButton
        className={`mode ${
          activeSelectedButton === SELECTED.BUBBLE ? "active" : ""
        }`}
        id={"bubble-effect"}
        title={"Select Bubble Effect"}
        icoHref={"#icon-bubble-effect"}
        setActive={setBothHandler}
      />

      <HeaderAppButton
        className={`mode ${
          activeSelectedButton === SELECTED.NEON ? "active" : ""
        }`}
        id={"neon-effect"}
        title={"Select Neon Effect"}
        icoHref={"#icon-neon-effect"}
        setActive={setBothHandler}
      />
    </>
  );
};
export default ModeButons;
