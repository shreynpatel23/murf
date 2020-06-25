import React from "react";
import Styles from "./onBoardingSideBar.module.scss";

function OnboardingSideBar(props) {
  const { img } = props;
  return (
    <div
      className={`${Styles.sideBarBackground} d-flex align-items-center justify-content-center`}
    >
      {img}
    </div>
  );
}

export default OnboardingSideBar;
