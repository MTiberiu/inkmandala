import { configureStore } from "@reduxjs/toolkit";
import hslSlice from "./hsl";
import events from "./addEvents";

const store = configureStore({
  reducer: { hsl: hslSlice.reducer, events: events.reducer },
});

export default store;
