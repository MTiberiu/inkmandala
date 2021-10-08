import React, { useState } from "react";
import HeaderAppButton from "../HeaderAppButton";
import { useMode } from "../EventsContext";

const HslButons = (param) => {
  const [activeMenuButton, setActiveMenuButton] = useState("hue");
  const SELECTED = param.selected;
  const changeMode = useMode();

  const setActivHslHandler = (e) => {
    setActiveMenuButton(e.target.id);
    changeMode(e.target.id);
  };
  return (
    <>
      <HeaderAppButton
        className={`menu ${activeMenuButton === SELECTED.HUE ? "active" : ""}`}
        id={"hue"}
        title={"Change color hue"}
        icoHref={"#icon-hue"}
        setActive={setActivHslHandler}
      />

      <HeaderAppButton
        className={`menu ${
          activeMenuButton === SELECTED.LIGHT ? "active" : ""
        }`}
        id={"light"}
        title={"Add/Remove Light"}
        icoHref={"#icon-light"}
        setActive={setActivHslHandler}
      />

      <HeaderAppButton
        className={`menu ${
          activeMenuButton === SELECTED.SATURATION ? "active" : ""
        }`}
        id={"saturation"}
        title={"Add/Remove Saturation"}
        icoHref={"#icon-saturation"}
        setActive={setActivHslHandler}
      />
    </>
  );
};
export default HslButons;
