import React, { useContext } from "react";

const EventsContext = React.createContext();
const LayersContext = React.createContext();
const PathContext = React.createContext();
const ModeContext = React.createContext();
const ColorPalleteContext = React.createContext();
const EffectsContext = React.createContext();
const StrokeContext = React.createContext();
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
export function useColorEffects() {
  return useContext(EffectsContext);
}
export function useStroke() {
  return useContext(StrokeContext);
}

export function useColorPalette() {
  return useContext(ColorPalleteContext);
}

const select = {
  hsl: { hue: "hue", saturation: "saturation", light: "light" },
  mode: { path: "fill", stroke: "stroke" },
  effects: { bubble: "bubble-effect", neon: "neon-effect" },
  stroke: {
    remove: "remove-outlines",
    one: "stroke-size-one",
    two: "stroke-size-two",
    three: "stroke-size-three",
    locked: "locked",
  },
};

export function FunctionalityProvider({ children }) {
  let selectedHSL = select.hsl.hue;
  let curColor, h, s, l;
  let selectedMode = "fill";
  let strokeSize = 0;
  let isStrokeLoked = false;
  function randomHSLValues() {
    h = Math.floor(Math.random() * 360);
    s = Math.floor(Math.random() * 45 + 30);
    l = Math.floor(Math.random() * 63 + 25);
  }
  randomHSLValues();

  const setColor = (color) => {
    if (selectedMode === "stroke" && !isStrokeLoked) {
      selectedPath.setAttribute("stroke-width", strokeSize);
    }
    selectedPath.style[selectedMode] = color;
  };

  const checkIfStrokeIsLoked = (param) => {
    if (param === select.stroke.locked) {
      isStrokeLoked = true;
    } else {
      isStrokeLoked = false;
    }
  };

  const updateStroke = (param) => {
    checkIfStrokeIsLoked(param);
    strokeSize = param;
  };

  const updateEffects = (param) => {
    selectedMode = param;
  };
  const updateDefinedValues = (modeSelected) => {
    h = selectedPath[modeSelected].h;
    s = selectedPath[modeSelected].s;
    l = selectedPath[modeSelected].l;
    // [h, s, l] = selectedPath[modeSelected][{ h, s, l }];
  };

  const pathReceiveValues = (modeSelected) => {
    curColor = `hsl(${h}, ${s}%, ${l}%)`;
    setColor(curColor);
    selectedPath[modeSelected] = { h: h, s: s, l: l };
  };

  let colorValues = h;
  let colorRangeMax = 360;
  let colorRangeMin = 0;
  let selectedPath = {
    style: { fill: "white", stroke: "red" },
    fill: { h: "red", s: "", l: "" },
    stroke: { h: "", s: "", l: "" },
  };

  const colorPalette = (hue, sat, light) => {
    colorValues = h = hue;
    s = sat;
    l = light;
  };

  function effect(modeSelected) {
    selectedPath.stroke.l = selectedPath.fill.l;
    if (modeSelected === select.effects.bubble) {
      selectedPath.fill.l -= 20;
    } else if (modeSelected === select.effects.effect) {
      selectedPath.fill.l += 20;
    }
  }

  const checkSelected = (modeSelected) => {
    console.log("selectedPath[modeSelected].h", modeSelected);
    if (!selectedPath[modeSelected]) {
      h = colorValues;
    } else {
      if (selectedHSL === select.hsl.hue) {
        colorValues = selectedPath[modeSelected].h;
        updateDefinedValues(modeSelected);
        changeColorValue();
        h = colorValues;
      } else if (selectedHSL === select.hsl.saturation) {
        colorValues = selectedPath[modeSelected].s;
        updateDefinedValues(modeSelected);
        changeColorValue();
        s = colorValues;
      } else if (selectedHSL === select.hsl.light) {
        colorValues = selectedPath[modeSelected].l;
        updateDefinedValues(modeSelected);
        changeColorValue();
        l = colorValues;
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
    selectedHSL = param;
    if (param === select.hsl.hue) {
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
  };

  const selectedPathHandler = (curColor, selectedMode) => {
    selectedPath.style[selectedMode] = curColor;
  };

  const eventSwitchValues = (e) => {
    let index = e.target.index;
    // selectedPath = e.target;
    isPathSelected(e);
    checkSelected(selectedMode);
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
  };

  const setselectedPath = (index) => {
    setActiveColor(index);
    pathReceiveValues(selectedMode);
  };

  const getColor = (e) => {
    // isPathSelected(e);
    selectedPath = e.target;
    pathReceiveValues(selectedMode);
    setActiveColor(selectedPath.index);
  };

  // find a better solution
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
    activeLayerIcoColor.style.backgroundColor = curColor;
    activeLayerColor.classList.add("activeLayer");
    activeColor.style.backgroundColor = curColor;
    layers[index].style.backgroundColor = curColor;
  };

  return (
    <EventsContext.Provider value={addEventsToPaths}>
      <LayersContext.Provider value={layers}>
        <PathContext.Provider value={selectedPathHandler}>
          <ModeContext.Provider value={updateMode}>
            <ColorPalleteContext.Provider value={colorPalette}>
              <EffectsContext.Provider value={updateEffects}>
                <StrokeContext.Provider value={updateStroke}>
                  {children}
                </StrokeContext.Provider>
              </EffectsContext.Provider>
            </ColorPalleteContext.Provider>
          </ModeContext.Provider>
        </PathContext.Provider>
      </LayersContext.Provider>
    </EventsContext.Provider>
  );
}
