import React from "react";
import Styles from "./onBoardingCard.module.scss";

function OnBoardingCard({ headerText, subText, ...props }) {
  return (
    <div className={`${Styles.loginCard}`}>
      <div
        style={{ height: "20%" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div>
          <div className="py-2">
            <p className={`mb-0 ${Styles.headerText}`}>{headerText}</p>
          </div>
          <div className="py-1">
            <p className={`mb-0 ${Styles.helperText}`}>{subText}</p>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default OnBoardingCard;
