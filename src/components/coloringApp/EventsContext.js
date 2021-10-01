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

const HSLMODE = {
  HUE: "hue",
  SATURATION: "saturation",
  LIGHT: "light",
};

export function FunctionalityProvider({ children }) {
  let hslMode = HSLMODE.HUE;

  const hslValues = {
    h: "50",
    s: "50",
    l: "50",
  };

  let color;

  function randomHSLValues() {
    hslValues.h = Math.floor(Math.random() * 360);
    hslValues.s = Math.floor(Math.random() * 100 + 20);
    hslValues.l = Math.floor(Math.random() * 60 + 20);
  }
  randomHSLValues();
  const pathReceiveValues = () => {
    color = `hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`;
    selectedPath.style.fill = color;
    selectedPath.h = hslValues.h;
    selectedPath.s = hslValues.s;
    selectedPath.l = hslValues.l;
  };

  let colorValues = hslValues.h;
  let colorRangeMax = 360;
  let colorRangeMin = 0;
  let selectedPath = { style: { fill: "white" }, h: "", s: "", l: "" };
  const colorPalette = (h, s, l) => {
    colorValues = hslValues.h = h;
    hslValues.s = s;
    hslValues.l = l;
  };
  const updateDefinedValues = () => {
    hslValues.h = selectedPath.h;
    hslValues.s = selectedPath.s;
    hslValues.l = selectedPath.l;
  };
  const setselectedPath = (index) => {
    setActiveColor(index);
    pathReceiveValues();
  };
  const checkSelected = () => {
    if (!selectedPath.h) {
      hslValues.h = colorValues;
    } else {
      if (hslMode === HSLMODE.HUE) {
        colorValues = selectedPath.h;
        updateDefinedValues();
        changeColorValue();
        hslValues.h = colorValues;
      } else if (hslMode === HSLMODE.SATURATION) {
        colorValues = selectedPath.s;
        updateDefinedValues();
        changeColorValue();
        hslValues.s = colorValues;
      } else if (hslMode === HSLMODE.LIGHT) {
        colorValues = selectedPath.l;
        updateDefinedValues();
        changeColorValue();
        hslValues.l = colorValues;
      }
    }
  };

  let dY;

  const changeColorValue = () => {
    if (dY < 0 && colorValues < colorRangeMax) {
      colorValues = colorValues + 5;
    } else if (dY > 0 && colorValues > colorRangeMin) {
      colorValues = colorValues - 5;
    } else if (colorValues >= 360) {
      colorValues = colorValues - 360;
    } else if (colorValues <= 0) {
      colorValues = colorValues + 360;
    }
  };

  window.addEventListener("wheel", function (event) {
    if (event.deltaY < 0) {
      dY = -1;
    } else if (event.deltaY > 0) {
      dY = 1;
    }
  });

  const updateMode = (param) => {
    hslMode = param;
    if (param === HSLMODE.HUE) {
      setColorRange(0, 360);
    } else {
      setColorRange(10, 90);
    }
  };

  const setColorRange = (rangeMin, rangeMax) => {
    colorRangeMin = rangeMin;
    colorRangeMax = rangeMax;
  };

  const isPathSelected = (e) => {
    if (selectedPath !== e.target) {
      selectedPath = e.target;
    }

    return selectedPath;
  };

  const getColor = (e) => {
    isPathSelected(e);
    pathReceiveValues();
    setActiveColor(selectedPath.index);
  };

  const selectedPathHandler = (color) => {
    selectedPath.style.fill = color;
  };

  const eventSwitchValues = (e) => {
    let index = e.target.index;
    selectedPath = e.target;
    checkSelected();
    setselectedPath(index);
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
    activeLayerIcoColor.style.backgroundColor = color;
    activeLayerColor.classList.add("activeLayer");
    activeColor.style.backgroundColor = color;
    layers[index].style.backgroundColor = color;
  };

  return (
    <EventsContext.Provider value={addEventsToPaths}>
      <LayersContext.Provider value={layers}>
        <PathContext.Provider value={selectedPathHandler}>
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
