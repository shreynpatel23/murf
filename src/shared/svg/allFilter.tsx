import React from "react";

function AllFilterSvg({ width = "20", height = "20", classes }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
    >
      <path
        className={classes}
        d="M24.556 59.519H5.444c-.244 0-.444.333-.444.741s.2.741.444.741h19.112c.244 0 .444-.333.444-.741s-.2-.741-.444-.741zM5.444 42.481h19.112c.244 0 .444-.333.444-.741s-.2-.74-.444-.74H5.444C5.2 41 5 41.333 5 41.741s.2.74.444.74zm19.111 7.778H5.444C5.2 50.259 5 50.593 5 51s.2.741.444.741h19.112c.244 0 .444-.333.444-.741s-.2-.741-.444-.741z"
        transform="translate(-5 -41)"
      />
    </svg>
  );
}

export default AllFilterSvg;
