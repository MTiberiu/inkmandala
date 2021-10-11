import React, { useState } from "react";
import { useColorPalette } from "../EventsContext";
const FooterColorPallete = (props) => {
  let { h } = props.h;

  const newSlValues = props.newSlValues;
  const colorPallete = useColorPalette();
  const addColorToPath = (event) => {
    colorPallete(
      event.currentTarget.getAttribute("data-hue"),
      newSlValues.s,
      newSlValues.l
    );
  };

  let nextColor = 0;
  const colorPalleteLength = [];
  for (let i = 0; i < 9; i++) {
    colorPalleteLength.push(i);
  }
  const generateColorPallete = () => {
    return colorPalleteLength.map((item) => {
      h = nextColor;
      nextColor += 40;

      return (
        <button
          className="color"
          style={{
            background: `hsl(${h},${newSlValues.s}%,${newSlValues.l}%)`,
          }}
          data-hue={h}
          onClick={addColorToPath}
        ></button>
      );
    });
  };
  const generateColors = generateColorPallete();

  return generateColors;
};

export default FooterColorPallete;
