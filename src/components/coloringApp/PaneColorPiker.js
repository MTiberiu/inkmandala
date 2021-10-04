import React from "react";
import { ColorPicker, useColor } from "react-color-palette";
import { usePath } from "./EventsContext";

const PanelColorPiker = (props) => {
  const [color, setColor] = useColor("hex", "#121212");
  const colorPath = usePath();
  document.querySelector(".canvas").style.background = color.hex;
  colorPath(color.hex);
  props.colorPath(color.hex);

  return (
    <ColorPicker
      width={300}
      height={100}
      color={color}
      onChange={setColor}
      hideHSV
      hideHEX
      hideRGB
      dark
    />
  );
};
export default PanelColorPiker;
