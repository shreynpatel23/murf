import { Colors } from "./colors";

export const primaryButtonStyle = {
  background: Colors.accentColor,
  transition: "background 0.3s",
  color: Colors.white,
  borderRadius: "5px",
  border: 0,
};

export const borderButtonStyle = {
  background: Colors.white,
  transition: "background 0.3s",
  border: `2px solid ${Colors.accentColor}`,
  color: Colors.accentColor,
  borderRadius: "5px",
}