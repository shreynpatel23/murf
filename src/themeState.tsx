// import React, { useEffect } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { generateTheme } from "./shared/colors";
import { hexToRgb } from "./utils/hexToRgb";

function ThemeState(props: any) {
  const history = useHistory();
  const performance = window.performance;
  useEffect(() => {
    function updateTheme() {
      const users_theme = localStorage.getItem("theme") || null;
      const existing_theme = generateTheme(users_theme);
      const rgb = hexToRgb(existing_theme.accentColor);
      document.documentElement.style.setProperty(
        "--accentColor",
        existing_theme.accentColor
      );
      document.documentElement.style.setProperty(
        "--accentBackGroundColor",
        `rgba(${rgb.r},${rgb.g},${rgb.b}, 0.15)`
      );
    }
    if (performance.navigation.type === 1) {
      updateTheme();
    }
    history.listen(() => {
      updateTheme();
    });
  }, [history, performance]);
  return props.children;
}

export default ThemeState;
