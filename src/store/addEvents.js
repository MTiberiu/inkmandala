import { createSlice } from "@reduxjs/toolkit";

let thisPath;
let layers = [];
const hslValours = { h: 360, s: 100, l: 50 };
const valourStates = { layersTest: layers, hslValours: hslValours };
const events = createSlice({
  name: "layers",
  initialState: valourStates,
  reducers: {
    addLayers(state, action) {
      console.log("reack toolkit:", action.payload);
    },
  },
});

let pathValues, h, s, l, sh, ss, sl;

function randomHSLValues() {
  h = sh = Math.floor(Math.random() * 360);
  s = ss = Math.floor(Math.random() * 26 + 38);
  l = sl = Math.floor(Math.random() * 29 + 63);
}
randomHSLValues();
let currentValues = {
  fill: {
    color: `hsl(${h}, ${s}%, ${l}%)`,
    hue: h,
    saturation: s,
    light: l,
  },
  stroke: {
    color: `hsl(${sh}, ${ss}%, ${sl}%)`,
    hue: sh,
    saturation: ss,
    light: sl,
  },
};

const updateHslValues = () => {
  currentValues = {
    fill: {
      color: `hsl(${h}, ${s}%, ${l}%)`,
      hue: h,
      saturation: s,
      light: l,
    },
    stroke: {
      color: `hsl(${sh}, ${ss}%, ${sl}%)`,
      hue: sh,
      saturation: ss,
      light: sl,
    },
  };
};
const setPathValues = (index) => {
  //   let activeLayerIcoColor = document.getElementById(
  //     `#path-layer${layers[index].index}`
  //   );
  //   let lastActiveLayerColor = document.querySelector(".activeLayer");
  //   if (lastActiveLayerColor) {
  //     lastActiveLayerColor.classList.remove("activeLayer");
  //   }

  //   let activeLayerColor = document.querySelector(
  //     `.layer-container${layers[index].index}`
  //   );
  //   let activeColor = document.querySelector(".active-color");

  pathValues.style.fill = currentValues.fill.color;
  layers[index].style.backgroundColor = currentValues.fill.color;
  //   activeLayerIcoColor.style.backgroundColor = currentValues.fill.color;
  //   activeLayerColor.classList.add("activeLayer");
  //   activeColor.style.backgroundColor = currentValues.fill.color;
  console.log("layers[index] from EventsContent", layers[index].index);
  pathValues.fillHue = currentValues.fill.hue;
  pathValues.fillSaturation = currentValues.fill.saturation;
  pathValues.fillLight = currentValues.fill.light;
};

const isPathSelected = (e) => {
  if (thisPath !== e.target) {
    thisPath = e.target;
    console.log(thisPath.index);
  }
  return thisPath;
};

const getColor = (e) => {
  isPathSelected(e);
};
const eventSwitchValues = (e) => {
  let index = e.target.index;
  isPathSelected(e);

  pathValues = e.target;

  randomHSLValues();
  updateHslValues();
  setPathValues(index);

  console.log("setPathValues", pathValues.fillHue);
};
const addEventsToPath = (paths) => {
  paths.querySelectorAll("path").forEach((path, index) => {
    if (path.style.fill !== "") {
      path.index = index;
      path.setAttribute("vector-effect", "non-scaling-stroke");
      path.onclick = getColor;
      path.onwheel = eventSwitchValues;
      layers[index] = path;
    }
  });
};
export const layersList = layers;
export const addEventsAction = addEventsToPath;
export const eventsActions = events.actions;
export default events;
