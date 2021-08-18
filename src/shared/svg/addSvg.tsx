import React from "react";

export default function AddSvg({ classes, width = "48", height = "48" }: any) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
    >
      <path d="M24 0C21.7908 0 20 1.79089 20 4V20H4C1.7909 20 0 21.7908 0 24C0 26.2092 1.7909 28 4 28H20V44C20 46.2091 21.7908 48 24 48C26.2092 48 28 46.2091 28 44V28H44C46.2091 28 48 26.2092 48 24C48 21.7908 46.2091 20 44 20H28V4C28 1.79089 26.2092 0 24 0Z" />
    </svg>
  );
}
