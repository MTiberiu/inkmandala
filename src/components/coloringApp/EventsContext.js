import React, { useContext } from "react";

const EventsContext = React.createContext();
const LayersContext = React.createContext();
const PathContext = React.createContext();
const ModeContext = React.createContext();
const ColorPalleteContext = React.createContext();
const SelectedContext = React.createContext();
const StrokeContext = React.createContext();
const SelectBothContext = React.createContext();
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
export function useSelected() {
  return useContext(SelectedContext);
}
export function useBoth() {
  return useContext(SelectBothContext);
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
  let curColor, curStrokeColor, h, s, l, sh, ss, sl;
  let selectedMode = "fill";
  let strokeSize = 0;
  let isStrokeLoked = false;
  function randomHSLValues() {
    h = Math.floor(Math.random() * 360);
    s = Math.floor(Math.random() * 45 + 30);
    l = Math.floor(Math.random() * 63 + 25);
  }
  randomHSLValues();

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

  const updateSelected = (param) => {
    selectedMode = param;
    selectedBoth = false;
  };

  const updateDefinedValues = (modeSelected) => {
    ({ h, s, l } = selectedPath[modeSelected]);
  };
  const checkIfStrokeIsOn = () => {
    if ((selectedMode === "stroke" && !isStrokeLoked) || selectedBoth) {
      selectedPath.setAttribute("stroke-width", strokeSize);
    }
  };
  const checkIfSelectedBothisOn = () => {
    if (selectedBoth) {
      checkSelectedEffect(h, s, l);
    }
  };
  const setColor = (color) => {
    checkIfStrokeIsOn();
    selectedPath.style[selectedMode] = color;
  };

  const pathReceiveValues = (modeSelected) => {
    curColor = `hsl(${h}, ${s}%, ${l}%)`;
    setColor(curColor);
    selectedPath[modeSelected] = { h: h, s: s, l: l };
    checkIfSelectedBothisOn();
  };

  const updateStrokeColor = (updateHue, updateSat, updateLight) => {
    selectedPath.style.stroke = `hsl(${updateHue}, ${updateSat}%, ${updateLight}%)`;
    selectedPath.stroke = { h: updateHue, s: updateSat, l: updateLight };
    curStrokeColor = selectedPath.style.stroke;
  };
  const checkSelectedEffect = (hue, sat, light) => {
    if (effectsMode === select.effects.bubble) {
      light -= 20;
      updateStrokeColor(hue, sat, light);
    } else if (effectsMode === select.effects.neon) {
      light += 20;

      updateStrokeColor(hue, sat, light);
    }
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
    console.log(hue, sat, light);
  };

  const checkSelected = (modeSelected) => {
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

  let selectedBoth = false;
  let effectsMode;
  const updateSelectBoth = (param) => {
    selectedMode = "fill";
    selectedBoth = true;
    effectsMode = param;
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

  const selectedPathHandler = (pikerColor, path) => {
    // if (path !== selectedPath) {
    //   selectedPath = path;
    // }
    let colorPiker = `hsl(${pikerColor.h} , ${pikerColor.s}%, ${pikerColor.l}%)`;
    curColor = selectedPath.style[selectedMode] = colorPiker;

    selectedPath[selectedMode] = {
      h: pikerColor.h,
      s: pikerColor.s,
      l: pikerColor.l,
    };
    [h, s, l] = [pikerColor.h, pikerColor.s, pikerColor.l];
    checkIfStrokeIsOn();
    checkIfSelectedBothisOn();
    if (selectedPath.index !== undefined) {
      setActiveColor(selectedPath.index, selectedMode);
    }
  };

  const eventSwitchValues = (e) => {
    let index = e.target.index;
    // selectedPath = e.target;
    isPathSelected(e);
    checkSelected(selectedMode);
    setSelectedPath(index, selectedMode);
  };

  const layers = [];
  const addEventsToPaths = (props) => {
    props.querySelectorAll("path").forEach((path, index) => {
      if (path.style.fill !== "") {
        path.index = index;
        path.setAttribute("class", "stroke-under");
        path.setAttribute("paint-order", "stroke");
        path.setAttribute("vector-effect", "non-scaling-stroke");
        path.onclick = getColor;
        path.onwheel = eventSwitchValues;
        layers[index] = path;
      }
    });
  };

  const setSelectedPath = (index) => {
    setActiveColor(index, selectedMode);
    pathReceiveValues(selectedMode);
  };

  const getColor = (e) => {
    // isPathSelected(e);
    selectedPath = e.target;
    pathReceiveValues(selectedMode);
    setActiveColor(selectedPath.index);
  };

  // find a better solution
  const setActiveColor = (index, selectedMode) => {
    console.log("index", index);
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
    activeLayerColor.classList.add("activeLayer");

    activeColor.style.backgroundColor = curColor;
    if (selectedBoth) {
      activeLayerIcoColor.style.backgroundColor = curColor;
      activeLayerIcoColor.style.borderColor = curStrokeColor;
      activeLayerColor.dataset.fillH = h;
      activeLayerColor.dataset.fillS = s;
      activeLayerColor.dataset.fillL = l;
      activeLayerColor.dataset.strokeH = sh;
      activeLayerColor.dataset.strokeS = ss;
      activeLayerColor.dataset.strokeL = sl;
      activeLayerColor.dataset.strokeSize = strokeSize;
    }
    if (selectedMode === "fill") {
      activeLayerIcoColor.style.backgroundColor = curColor;
    } else {
      activeLayerIcoColor.style.borderColor = curColor;
    }
    layers[index].style.backgroundColor = curColor;
  };

  return (
    <EventsContext.Provider value={addEventsToPaths}>
      <LayersContext.Provider value={layers}>
        <PathContext.Provider value={selectedPathHandler}>
          <ModeContext.Provider value={updateMode}>
            <ColorPalleteContext.Provider value={colorPalette}>
              <SelectedContext.Provider value={updateSelected}>
                <StrokeContext.Provider value={updateStroke}>
                  <SelectBothContext.Provider value={updateSelectBoth}>
                    {children}
                  </SelectBothContext.Provider>
                </StrokeContext.Provider>
              </SelectedContext.Provider>
            </ColorPalleteContext.Provider>
          </ModeContext.Provider>
        </PathContext.Provider>
      </LayersContext.Provider>
    </EventsContext.Provider>
  );
}
