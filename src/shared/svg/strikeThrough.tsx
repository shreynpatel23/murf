import React from "react";

function StrikeThrough({ width, height }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5 4H5.722C5.894 4.294 6 4.633 6 4.999C6 6.104 5.104 7 4 7H2.915C2.556 7 2.225 6.896 1.934 6.732C1.851 6.889 1.689 7 1.5 7H1.25C1.112 7 1 6.887 1 6.75V6.498V5.498V5.248C1 5.111 1.112 4.998 1.25 4.998H1.5C1.719 4.998 1.899 5.14 1.968 5.337L1.98 5.334C2.119 5.721 2.48 5.998 2.915 5.998H4C4.553 5.998 5 5.553 5 4.998C5 4.448 4.553 4 4 4H3.5H3H2.915H0.499C0.223 4 0 3.776 0 3.5C0 3.223 0.223 3 0.499 3H1.278C1.106 2.705 1 2.365 1 2C1 0.896 1.896 0 3 0H4.087C4.444 0 4.775 0.104 5.066 0.267C5.15 0.11 5.311 0 5.5 0H5.75C5.889 0 6 0.112 6 0.25V0.5V1.5V1.75C6 1.889 5.889 2 5.75 2H5.5C5.282 2 5.101 1.858 5.031 1.661L5.02 1.665C4.881 1.278 4.52 1 4.087 1H3C2.447 1 2 1.447 2 2C2 2.553 2.447 3 3 3H3.5H4H6.5C6.776 3 7 3.223 7 3.5C7 3.776 6.776 4 6.5 4Z"
        fill="black"
      />
    </svg>
  );
}

export default StrikeThrough;
