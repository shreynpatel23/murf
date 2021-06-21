const themes = {
  GREY: "Grey",
  GREEN: "Green",
  ORANGE: "Orange",
  DEFAULT: "Default",
};

export const Colors = {
  backgroundColor: "#fafafa",
  accentColor: "#2190FF",
  white: "#ffffff",
  accentBackGroundColor: "rgba(this.accentColor, 0.15)",
  secondaryColor: "#adadad",
  primaryColor: "#4d4848",
};

export function generateTheme(themeColor: string) {
  if (themeColor === themes.DEFAULT) {
    return {
      ...Colors,
      accentColor: "#2190FF",
    };
  }
  if (themeColor === themes.GREEN) {
    return {
      ...Colors,
      accentColor: "#00ca6d",
    };
  }
  if (themeColor === themes.ORANGE) {
    return {
      ...Colors,
      accentColor: "#FFB045",
    };
  }
  if (themeColor === themes.GREY) {
    return {
      ...Colors,
      accentColor: "#888888",
    };
  }
  return {
    ...Colors,
    accentColor: "#2190FF",
  };
}
