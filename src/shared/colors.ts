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
  success: "#5dac30",
  error: "#e94b4b",
};

export function generateTheme(themeColor: string) {
  if (themeColor === themes.DEFAULT) {
    return {
      ...Colors,
      accentColor: "#2190FF",
      accentBackGroundColor: "rgba(#2190FF, 0.15)",
    };
  }
  if (themeColor === themes.GREEN) {
    return {
      ...Colors,
      accentColor: "#00ca6d",
      accentBackGroundColor: "rgba(#00ca6d, 0.15)",
    };
  }
  if (themeColor === themes.ORANGE) {
    return {
      ...Colors,
      accentColor: "#FFB045",
      accentBackGroundColor: "rgba(#FFB045, 0.15)",
    };
  }
  if (themeColor === themes.GREY) {
    return {
      ...Colors,
      accentColor: "#888888",
      accentBackGroundColor: "rgba(#888888, 0.15)",
    };
  }
  return {
    ...Colors,
    accentColor: "#2190FF",
    accentBackGroundColor: "rgba(#2190FF, 0.15)",
  };
}
