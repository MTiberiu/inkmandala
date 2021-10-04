import React, { useState } from "react";
import HeaderAppButton from "../HeaderAppButton";
import { useColorEffects } from "../EventsContext";
const ModeButons = (param) => {
  const [activeEffectButton, setActiveEffectButton] = useState("fill");
  const changeEffects = useColorEffects();
  const SELECTED = param.selected;
  const setActivModeHandler = (e) => {
    setActiveEffectButton(e.target.id);
    changeEffects(e.target.id);
  };
  return (
    <>
      <HeaderAppButton
        className={`mode ${
          activeEffectButton === SELECTED.PATH ? "active" : ""
        }`}
        id={"fill"}
        title={"Select Path"}
        icoHref={"#icon-select-path"}
        setActive={setActivModeHandler}
      />

      <HeaderAppButton
        className={`mode ${
          activeEffectButton === SELECTED.STROKE ? "active" : ""
        }`}
        id={"stroke"}
        title={"Select Outline"}
        icoHref={"#icon-outline"}
        setActive={setActivModeHandler}
      />

      <HeaderAppButton
        className={`mode ${
          activeEffectButton === SELECTED.BUBBLE ? "active" : ""
        }`}
        id={"bubble-effect"}
        title={"Select Bubble Effect"}
        icoHref={"#icon-bubble-effect"}
        setActive={setActivModeHandler}
      />

      <HeaderAppButton
        className={`mode ${
          activeEffectButton === SELECTED.NEON ? "active" : ""
        }`}
        id={"neon-effect"}
        title={"Select Neon Effect"}
        icoHref={"#icon-neon-effect"}
        setActive={setActivModeHandler}
      />
    </>
  );
};
export default ModeButons;
