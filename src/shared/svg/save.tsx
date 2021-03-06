import React from "react";

export default function SaveSvg({
  width = "15.949",
  height = "21.065",
  classes,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15.949 21.065"
    >
      <g>
        <path
          className={classes}
          d="M24.7 34.665a1.207 1.207 0 0 1-1.2-1.2V17.813a4.225 4.225 0 0 1 4.213-4.213h7.523a4.225 4.225 0 0 1 4.213 4.213V33.4a1.205 1.205 0 0 1-.361.873 1.163 1.163 0 0 1-.812.331 1.205 1.205 0 0 1-.873-.361l-5.748-6.079-6.139 6.136a1.075 1.075 0 0 1-.816.365zm3.009-19.831a3.018 3.018 0 0 0-3.009 3.009v15.588l6.982-6.982 6.56 6.921V17.843a3.018 3.018 0 0 0-3.009-3.009h-7.52z"
          transform="translate(-23.5 -13.6)"
        />
      </g>
    </svg>
  );
}
