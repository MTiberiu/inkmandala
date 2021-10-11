import React, { useState, useContext } from "react";

const FooterContext = React.createContext();
const ValueContext = React.createContext();

export function useColorValues() {
  return useContext(FooterContext);
}
export function useSlValues() {
  return useContext(ValueContext);
}
export function FooterProvider({ children }) {
  const footerPallete = { s: 60, l: 40 };
  const colorValues = {
    20: { s: 20, l: 80 },
    40: { s: 40, l: 60 },
    60: { s: 60, l: 30 },
    80: { s: 80, l: 40 },
    100: { s: 100, l: 50 },
  };

  const changeColorValues = (selectedPallet) => {
    footerPallete.s = colorValues[selectedPallet].s;
    footerPallete.l = colorValues[selectedPallet].l;
  };
  return (
    <FooterContext.Provider value={changeColorValues}>
      <ValueContext.Provider value={footerPallete}>
        {children}
      </ValueContext.Provider>
    </FooterContext.Provider>
  );
}
