import React from "react";
import { useColorPalette } from "./EventsContext";
import "./FooterApp.scss";

const FooterApp = () => {
  const colorPallete = useColorPalette();

  return (
    <footer className="app">
      <div className="colors">
        <div class="color color1" onClick={() => colorPallete(0, 38, 63)}></div>
        <div
          className="color color2"
          onClick={() => colorPallete(40, 38, 63)}
        ></div>
        <div
          className="color color3"
          onClick={() => colorPallete(80, 38, 63)}
        ></div>
        <div
          className="color color4"
          onClick={() => colorPallete(120, 38, 63)}
        ></div>
        <div
          className="color color5"
          onClick={() => colorPallete(160, 38, 63)}
        ></div>
        <div
          className="color color6"
          onClick={() => colorPallete(200, 38, 63)}
        ></div>
        <div
          className="color color7"
          onClick={() => colorPallete(240, 38, 63)}
        ></div>
        <div
          className="color color8"
          onClick={() => colorPallete(280, 38, 63)}
        ></div>
        <div
          className="color color9"
          onClick={() => colorPallete(320, 38, 63)}
        ></div>
      </div>
    </footer>
  );
};
export default FooterApp;
