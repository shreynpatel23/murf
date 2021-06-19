import { Colors } from "./colors";

export const primaryButtonStyle = {
  background: Colors.accentColor,
  transition: "all 0.3s",
  color: Colors.white,
  borderRadius: "5px",
  border: 0,
};

export const borderButtonStyle = {
  border: `2px solid ${Colors.accentColor}`,
  transition: "all 0.3s",
  color: Colors.accentColor,
  borderRadius: "5px",
  background: "transparent",
};

export const secondaryButtonStyle = {
  background: Colors.white,
  transition: "background 0.3s",
  border: `2px solid ${Colors.secondaryColor}`,
  color: Colors.secondaryColor,
  borderRadius: "5px",
};

export const secondaryButtonHoverStyle = {
  background: Colors.secondaryColor,
  transition: "background 0.3s",
  color: Colors.white,
  borderRadius: "5px",
  border: 0,
};
