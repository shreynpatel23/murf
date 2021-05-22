import React from "react";

function Underline({ width, height }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 28H24V32H0V28ZM16 0V2.001C17.105 2.001 18 2.896 18 4.001V16.001C18 19.314 15.312 22.001 12 22.001C8.684 22.001 6 19.314 6 16.001V4.001C6 2.897 6.895 2.001 8 2.001V0H0V2.001C1.105 2.001 2 2.896 2 4.001V16.001C2 21.523 6.477 26 12 26C17.523 26 22 21.523 22 16.001V4.001C22 2.897 22.895 2.001 24 2.001V0H16Z"
        fill="black"
      />
    </svg>
  );
}

export default Underline;
