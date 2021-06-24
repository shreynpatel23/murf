import React from "react";
import Styles from "../sharedStyles.module.scss";

export default function AddPostBannerSvg({ classes }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      viewBox="0 0 1109.002 207"
    >
      <g id="add-post-background" transform="translate(-559.998 -168)">
        <g
          id="Rectangle_194"
          fill="#eaeaea"
          stroke="#eaeaea"
          transform="translate(560 168)"
        >
          <rect width="1109" height="207" rx="20" />
          <rect width="1108" height="206" x=".5" y=".5" fill="none" rx="19.5" />
        </g>
        <g id="Intersection_3" className={Styles.post_empty_state_back}>
          <path
            d="M-6800.555 19930.498h-198.447c-2.633 0-5.186-.516-7.59-1.531-2.322-.983-4.408-2.389-6.199-4.18-1.79-1.79-3.197-3.877-4.179-6.2-1.016-2.401-1.532-4.956-1.532-7.589V19744c0-2.633.516-5.188 1.532-7.59.982-2.322 2.388-4.408 4.18-6.2 1.79-1.79 3.876-3.196 6.198-4.179 2.404-1.015 4.957-1.531 7.59-1.531h198.445c5.593 6.908 10.65 14.355 15.036 22.137 4.473 7.94 8.305 16.332 11.387 24.943 6.394 17.86 9.636 36.672 9.636 55.918 0 19.246-3.242 38.06-9.635 55.92-3.082 8.611-6.913 17.004-11.387 24.943-4.385 7.782-9.442 15.229-15.035 22.137z"
            transform="translate(7579 -19556)"
          />
          <path
            fill="#eaeaea"
            d="M-6800.793 19929.998c5.515-6.834 10.505-14.195 14.837-21.883 4.46-7.914 8.28-16.281 11.352-24.865 6.374-17.805 9.606-36.563 9.606-55.752 0-19.187-3.232-37.945-9.606-55.75-3.074-8.584-6.893-16.951-11.353-24.865-4.332-7.688-9.323-15.049-14.838-21.883h-198.207c-2.565 0-5.054.502-7.395 1.492-2.263.957-4.295 2.328-6.04 4.072-1.745 1.747-3.115 3.778-4.072 6.04-.99 2.341-1.493 4.83-1.493 7.396v166.998c0 2.566.502 5.055 1.493 7.397.957 2.261 2.327 4.292 4.072 6.039 1.745 1.744 3.777 3.115 6.04 4.072 2.341.99 4.83 1.492 7.395 1.492h198.209m.477 1h-198.686c-11.046 0-20-8.953-20-20V19744c0-11.047 8.954-20 20-20h198.684c22.654 27.9 36.32 64.03 36.32 103.498 0 39.47-13.665 75.6-36.318 103.5z"
            transform="translate(7579 -19556)"
          />
        </g>
        <path
          id="Intersection_1"
          className={Styles.post_empty_state_back}
          d="M-6167.461 19719H-6075a20 20 0 0 1 20 20v59a119.539 119.539 0 0 1-112.461-79z"
          transform="translate(7724 -19551)"
        />
      </g>
    </svg>
  );
}