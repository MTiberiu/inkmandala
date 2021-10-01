import React, { useContext } from "react";

const EventsContext = React.createContext();
const LayersContext = React.createContext();
const PathContext = React.createContext();
const ModeContext = React.createContext();
const ColorPalleteContext = React.createContext();

export function useEvents() {
  return useContext(EventsContext);
}

export function useLayers() {
  return useContext(LayersContext);
}
export function usePath() {
  return useContext(PathContext);
}
export function useMode() {
  return useContext(ModeContext);
}
export function useColorPalette() {
  return useContext(ColorPalleteContext);
}
export function FunctionalityProvider({ children }) {
  // const [hslMode, setHslMode] = useState("hue");
  let hslMode = "hue";
  let selectedPath, s, h, l;

  function randomHSLValues() {
    h = Math.floor(Math.random() * 360);
    s = Math.floor(Math.random() * 100 + 20);
    l = Math.floor(Math.random() * 60 + 20);
  }
  randomHSLValues();

  let colorValues = h;
  let colorRangeMax = 360;
  let colorRangeMin = 0;

  const colorPalette = (hue, saturation, light) => {
    colorValues = h = hue;
    s = saturation;
    l = light;

    console.log("test", hue, saturation, light);
  };

  const setselectedPath = (index) => {
    setActiveColor(index);
    selectedPath.style.fill = `hsl(${h}, ${s}%, ${l}%)`;
    selectedPath.h = h;
    selectedPath.s = s;
    selectedPath.l = l;
  };
  const checkSelected = () => {
    if (!selectedPath.h) {
      h = colorValues;
    } else {
      if (hslMode === "hue") {
        colorValues = h = selectedPath.h;
        s = selectedPath.s;
        l = selectedPath.l;
        changeColorValue();
        h = colorValues;
      } else if (hslMode === "saturation") {
        h = selectedPath.h;
        colorValues = s = selectedPath.s;
        l = selectedPath.l;
        changeColorValue();
        s = colorValues;
      } else if (hslMode === "light") {
        h = selectedPath.h;
        s = selectedPath.s;
        colorValues = l = selectedPath.l;
        changeColorValue();
        l = colorValues;
      }
    }
  };

  let dY;

  const changeColorValue = () => {
    if (dY < 2 && colorValues < colorRangeMax) {
      colorValues = colorValues + 5;
    } else if (dY > 2 && colorValues > colorRangeMin) {
      colorValues = colorValues - 5;
    } else if (colorValues >= 360) {
      colorValues = colorValues - 360;
    } else if (colorValues <= 0) {
      colorValues = colorValues + 360;
    }
  };

  window.addEventListener("wheel", function (event) {
    if (event.deltaY < 0) {
      dY = 1;
    } else if (event.deltaY > 0) {
      dY = 3;
    }
  });

  const updateMode = (param) => {
    hslMode = param;
    if (param === "hue") {
      setColorRange(0, 360);
    } else {
      setColorRange(10, 90);
    }
  };

  const setColorRange = (rangeMin, rangeMax) => {
    colorRangeMin = rangeMin;
    colorRangeMax = rangeMax;
  };

  let thisPath = { style: { fill: "white" } };
  const isPathSelected = (e) => {
    if (thisPath !== e.target) {
      thisPath = e.target;
    }

    return thisPath;
  };

  const getColor = (e) => {
    isPathSelected(e);
    e.preventDefault();
    thisPath.style.fill = `hsl(${h}, ${s}%, ${l}%)`;
    thisPath.h = h;
    thisPath.s = s;
    thisPath.l = l;
    setActiveColor(thisPath.index);
  };

  const thisPathHandler = (color) => {
    thisPath.style.fill = color;
  };

  const eventSwitchValues = (e) => {
    let index = e.target.index;
    selectedPath = e.target;
    checkSelected();
    setselectedPath(index);
    console.log(h, s, l);
  };

  const layers = [];
  const addEventsToPaths = (props) => {
    props.querySelectorAll("path").forEach((path, index) => {
      if (path.style.fill !== "") {
        path.index = index;
        path.setAttribute("vector-effect", "non-scaling-stroke");
        path.onclick = getColor;
        path.onwheel = eventSwitchValues;
        layers[index] = path;
      }
    });

    if (layers.length !== 0) {
    }
  };

  const setActiveColor = (index) => {
    let activeLayerIcoColor = document.getElementById(
      `#path-layer${layers[index].index}`
    );
    let lastActiveLayerColor = document.querySelector(".activeLayer");
    if (lastActiveLayerColor) {
      lastActiveLayerColor.classList.remove("activeLayer");
    }
    let activeLayerColor = document.querySelector(
      `.layer-container${layers[index].index}`
    );
    let activeColor = document.querySelector(".active-color");
    activeLayerIcoColor.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
    activeLayerColor.classList.add("activeLayer");
    activeColor.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
    layers[index].style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  };

  return (
    <EventsContext.Provider value={addEventsToPaths}>
      <LayersContext.Provider value={layers}>
        <PathContext.Provider value={thisPathHandler}>
          <ModeContext.Provider value={updateMode}>
            <ColorPalleteContext.Provider value={colorPalette}>
              {children}
            </ColorPalleteContext.Provider>
          </ModeContext.Provider>
        </PathContext.Provider>
      </LayersContext.Provider>
    </EventsContext.Provider>
  );
}
