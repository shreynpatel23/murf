import React from "react";

function ArrowDown({ width = "10", height = "8", color = "#adadad" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 9.836 7.895"
    >
      <path
        fill={color}
        d="M-7158 19710.893a.994.994 0 0 1-.831-.449l-3.918-5.891a.985.985 0 0 1-.047-1.027.982.982 0 0 1 .878-.527h7.836a.981.981 0 0 1 .878.527.985.985 0 0 1-.047 1.027l-3.918 5.891a.994.994 0 0 1-.831.449zm-3.612-6.936l3.611 5.732 3.611-5.732h-7.223z"
        transform="translate(7162.918 -19702.998)"
      />
    </svg>
  );
}

export default ArrowDown;
