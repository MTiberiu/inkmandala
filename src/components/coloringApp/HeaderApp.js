import React, { useState } from "react";
import "./HeaderApp.scss";
import HeaderAppButton from "./HeaderAppButton";
import HslButtons from "./header/HslButtons";
import ModeButons from "./header/ModeButtons";
import StrokeSizeButtons from "./header/StrokeSizeButtons";

const SELECTED = {
  HUE: "hue",
  SATURATION: "saturation",
  LIGHT: "light",
  PATH: "fill",
  STROKE: "stroke",
  BUBBLE: "bubble-effect",
  NEON: "neon-effect",
  STROKESIZE: {
    REMOVE: "0",
    ONE: "4",
    TWO: "6",
    THREE: "8",
    LOKED: "locked",
  },
};

const HeaderApp = () => {
  const [darkBg, setDarkBg] = useState(false);
  const [toggleNightButton, setToggleNightButton] = useState("");
  const toggleBgColor = () => {
    const background = document.querySelector(".canvas");
    if (!darkBg) {
      background.style.background = "black";
      setDarkBg(true);
      setToggleNightButton("active");
    }
    if (darkBg) {
      background.style.background = "white";
      setToggleNightButton("");
      setDarkBg(false);
    }
  };

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

  return (
    <header className="app">
      <nav>
        <div className="menu-items">
          <HslButtons selected={SELECTED} />
        </div>
        <div className="menu-items effect">
          <ModeButons selected={SELECTED} />
        </div>
        <div className="menu-items stroke">
          <StrokeSizeButtons selected={SELECTED.STROKESIZE} />
        </div>
        <div className="menu-items">
          <button
            className={`mode-stroke ${toggleNightButton}`}
            id={"togle-ui"}
            alt={"togle-ui"}
            title={"Togle Ui"}
            onClick={toggleBgColor}
          >
            <svg
              className="togle-ui"
              width="100%"
              height="100%"
              viewBox="0 0 59 60"
            >
              <g transform="matrix(1,0,0,1,-385.177,-473.502)">
                <g transform="matrix(1,0,0,1,-29.4821,125.084)">
                  <path d="M473.558,384.37C473.812,383.169 473.309,381.935 472.289,381.254C471.268,380.572 469.936,380.581 468.924,381.276C466.266,383.102 463.049,384.17 459.585,384.17C450.462,384.17 443.055,376.763 443.055,367.64C443.055,362.07 445.817,357.141 450.043,354.145C451.044,353.435 451.512,352.188 451.225,350.995C450.938,349.803 449.953,348.905 448.74,348.728C447.332,348.524 445.894,348.418 444.431,348.418C427.999,348.418 414.659,361.758 414.659,378.189C414.659,394.621 427.999,407.961 444.431,407.961C458.743,407.961 470.709,397.839 473.558,384.37ZM441.186,354.64C438.584,358.314 437.055,362.8 437.055,367.64C437.055,380.074 447.15,390.17 459.585,390.17C461.59,390.17 463.535,389.907 465.387,389.414L465.388,389.413C461.378,396.88 453.493,401.961 444.431,401.961C431.311,401.961 420.659,391.309 420.659,378.189C420.659,366.17 429.598,356.223 441.186,354.64Z" />
                </g>
              </g>
            </svg>
          </button>
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
        <div className="menu-items reset-menu"></div>
      </nav>
    </header>
  );
};

export default HeaderApp;
