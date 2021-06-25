import React from "react";

function EditSvg({ width = "21.311", height = "21.311", classes }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 21.311 21.311"
    >
      <g>
        <path
          className={classes}
          d="M25.712 7.076a4.369 4.369 0 0 1 0 6.18l-.409.433a.833.833 0 0 1-1.178-1.178l.433-.433a2.671 2.671 0 0 0 0-3.8l-.144-.144a2.67 2.67 0 0 0-3.8 0L7.946 20.782l-.481 4.424 4.424-.481 9.184-9.186-1.973-1.971a.833.833 0 1 1 1.178-1.178l2.572 2.573a.814.814 0 0 1 0 1.178l-9.976 9.979a.831.831 0 0 1-.5.24l-5.746.625h-.1a.948.948 0 0 1-.6-.24.838.838 0 0 1-.24-.7l.623-5.745a.831.831 0 0 1 .24-.5L19.389 6.955a4.367 4.367 0 0 1 6.179 0z"
          transform="translate(-5.681 -5.675)"
        />
      </g>
    </svg>
  );
}

export default EditSvg;
