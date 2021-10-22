import React, { useRef } from "react";

import "./FooterApp.scss";
import FooterColorPallete from "./footer/FooterColorPallete";
import { useColorValues, useSlValues } from "./footer/FooterContext";
let curValue = 60;
const FooterApp = () => {
  const newSlValues = useSlValues();
  // const [values, seValues] = useState(curValue);
  const changeColorValues = useColorValues();
  const colorsRef = useRef();
  let hue = 0;
  let h = 0;
  const changeColors = (event) => {
    const id = event.target.id;
    if (id === "before") {
      curValue -= 20;
    } else if (id === "next") {
      curValue += 20;
    }
    if (curValue === 0) {
      curValue = 100;
    } else if (curValue === 120) {
      curValue = 20;
    }
    // depending on the curValue, set saturation and light values in  FooterContext
    changeColorValues(curValue);
    changeButtonsBackgroundColor();
  };
  const changeButtonsBackgroundColor = () => {
    const allColorButtons = colorsRef.current.querySelectorAll(".color");
    for (let i = 0; i < 9; i++) {
      allColorButtons[
        i
      ].style.backgroundColor = `hsl(${h},${newSlValues.s}%,${newSlValues.l}%)`;
      h += 40;
    }
  };

  return (
    <div className="app footer-app">
      <div className="colors" ref={colorsRef}>
        <div className="next-color">
          <i className="arrow left" id="before" onClick={changeColors}></i>
        </div>
        <FooterColorPallete h={hue} newSlValues={newSlValues} />
        <div className="next-color">
          <i className="arrow right" id="next" onClick={changeColors}></i>
        </div>
      </div>
    </div>
  );
};
export default FooterApp;
