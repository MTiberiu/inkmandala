import React, { useState } from "react";
import "./HeaderApp.scss";
import HeaderAppButton from "./HeaderAppButton";
import { useMode } from "./EventsContext";

const HeaderApp = () => {
  const [activeMenuButton, setActiveMenuButton] = useState("hue");
  const [activeModeButton, setActiveModeButton] = useState("select-path");
  const [activeStrokeButton, setActiveStrokeButton] =
    useState("remove-outlines");
  const changeMode = useMode();
  function resetColors() {
    const paths = document.querySelectorAll("path");
    const layerColors = document.querySelectorAll(".shape-color");
    paths.forEach((path) => {
      if (path.style.fill !== "") {
        path.style.fill = "white";
        path.setAttribute("stroke-width", 0);
      }
    });

    layerColors.forEach((layer) => {
      layer.style.backgroundColor = "transparent";
    });
  }
  const setActivHslHandler = (e) => {
    setActiveMenuButton(e.target.id);
    changeMode(e.target.id);
    // let activeButton = e.target.id;
    // if (activeButton === "hue") {
    //   dispatch(hslActions.hue());
    // } else if (activeButton === "saturation") {
    //   dispatch(hslActions.saturation());
    // } else {
    //   dispatch(hslActions.light());
    // }
  };
  const setActivModeHandler = (e) => {
    setActiveModeButton(e.target.id);
  };
  const setActivStrokeHandler = (e) => {
    setActiveStrokeButton(e.target.id);
  };
  return (
    <header className="app">
      <nav>
        {/* <div>{h}</div> | <div>{l}</div> | <div>{s}</div> */}
        <div className="menu-items">
          <HeaderAppButton
            className={`menu ${activeMenuButton === "hue" ? "active" : ""}`}
            id={"hue"}
            title={"Change color hue"}
            icoHref={"#icon-hue"}
            setActive={setActivHslHandler}
          />
          <HeaderAppButton
            className={`menu ${activeMenuButton === "light" ? "active" : ""}`}
            id={"light"}
            title={"Add/Remove Light"}
            icoHref={"#icon-light"}
            setActive={setActivHslHandler}
          />
          <HeaderAppButton
            className={`menu ${
              activeMenuButton === "saturation" ? "active" : ""
            }`}
            id={"saturation"}
            title={"Add/Remove Saturation"}
            icoHref={"#icon-saturation"}
            setActive={setActivHslHandler}
          />
        </div>

        <div className="menu-items effects">
          <HeaderAppButton
            className={`mode ${
              activeModeButton === "select-path" ? "active" : ""
            }`}
            id={"select-path"}
            title={"Select Path"}
            icoHref={"#icon-select-path"}
            setActive={setActivModeHandler}
          />

          <HeaderAppButton
            className={`mode ${
              activeModeButton === "select-outline" ? "active" : ""
            }`}
            id={"select-outline"}
            title={"Select Outline"}
            icoHref={"#icon-outline"}
            setActive={setActivModeHandler}
          />

          <HeaderAppButton
            className={`mode ${
              activeModeButton === "bubble-effect" ? "active" : ""
            }`}
            id={"bubble-effect"}
            title={"Select Bubble Effect"}
            icoHref={"#icon-bubble-effect"}
            setActive={setActivModeHandler}
          />

          <HeaderAppButton
            className={`mode ${
              activeModeButton === "neon-effect" ? "active" : ""
            }`}
            id={"neon-effect"}
            title={"Select Neon Effect"}
            icoHref={"#icon-neon-effect"}
            setActive={setActivModeHandler}
          />
        </div>

        <div className="menu-items stroke">
          <HeaderAppButton
            className={`mode-stroke ${
              activeStrokeButton === "remove-outlines" ? "active" : ""
            }`}
            id={"remove-outlines"}
            title={"Select Remove Outlines"}
            icoHref={"#icon-remove-outlines"}
            setActive={setActivStrokeHandler}
          />
          <HeaderAppButton
            className={`mode-stroke ${
              activeStrokeButton === "stroke-size-one" ? "active" : ""
            }`}
            id={"stroke-size-one"}
            title={"Select Icon Stroke Size One"}
            icoHref={"#icon-stroke-size-one"}
            setActive={setActivStrokeHandler}
          />

          <HeaderAppButton
            className={`mode-stroke ${
              activeStrokeButton === "stroke-size-two" ? "active" : ""
            }`}
            id={"stroke-size-two"}
            title={"Select Icon Stroke Size Two"}
            icoHref={"#icon-stroke-size-two"}
            setActive={setActivStrokeHandler}
          />
          <HeaderAppButton
            className={`mode-stroke ${
              activeStrokeButton === "stroke-size-three" ? "active" : ""
            }`}
            id={"stroke-size-three"}
            title={"Select Icon Stroke Size Three"}
            icoHref={"#icon-stroke-size-three"}
            setActive={setActivStrokeHandler}
          />

          <HeaderAppButton
            className={`mode-stroke ${
              activeStrokeButton === "locked" ? "active" : ""
            }`}
            id={"locked"}
            title={"Lock Strokes Size"}
            icoHref={"#icon-locked"}
            setActive={setActivStrokeHandler}
          />
        </div>
        <div className="menu-items reset-menu">
          <HeaderAppButton
            className={"reset"}
            id={"reset"}
            title={"Reset Colors"}
            icoHref={"#icon-clear-all"}
            setActive={resetColors}
          />
        </div>
      </nav>
    </header>
  );
};

export default HeaderApp;
