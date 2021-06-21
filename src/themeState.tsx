// import React, { useEffect } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { generateTheme } from "./shared/colors";

function ThemeState(props: any) {
  const history = useHistory();
  const performance = window.performance;
  useEffect(() => {
    if (performance.navigation.type === 1) {
      const users_theme = localStorage.getItem("theme") || null;
      const existing_theme = generateTheme(users_theme);
      document.documentElement.style.setProperty(
        "--accentColor",
        existing_theme.accentColor
      );
    }
    history.listen(() => {
      const users_theme = localStorage.getItem("theme") || null;
      const existing_theme = generateTheme(users_theme);
      document.documentElement.style.setProperty(
        "--accentColor",
        existing_theme.accentColor
      );
    });
  }, [history, performance]);
  return props.children;
}

export default ThemeState;
