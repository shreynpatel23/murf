import React from "react";
import { Colors } from "../colors";

function TickSvg({ color = Colors.accentColor, width = "10", height = "10" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 28.313 20.813"
      style={{ fill: color }}
    >
      <path
        d="M16.676 28.849a2.441 2.441 0 0 1-1.731-.717l-7.5-7.5a2.448 2.448 0 0 1 3.462-3.462l5.768 5.768L30.861 8.752a2.45 2.45 0 1 1 3.464 3.464L18.406 28.134a2.45 2.45 0 0 1-1.73.715z"
        transform="translate(-6.728 -8.036)"
      />
    </svg>
  );
}

export default TickSvg;
