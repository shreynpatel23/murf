import React from "react";
import Styles from "./button.module.scss";
import { buttonSize } from "../../constants/button-size";
import { buttonTypes } from "../buttonTypes";

function Button({ isLoading = false, type, size, ...props }) {
  return (
    <button
      className={`${Styles.button} ${
        size === buttonSize.LARGE ? Styles.largeButton : Styles.mediumButton
      } ${
        type === buttonTypes.PRIMARY
          ? Styles.primaryButtonStyle
          : buttonTypes.SECONDARY
          ? Styles.secondaryButtonStyle
          : buttonTypes.CANCEL
          ? Styles.cancelButtonStyle
          : ""
      } d-flex align-items-center justify-content-center`}
      {...props}
    >
      {isLoading ? (
        <p className={`mb-0 ${Styles.btnText}`}>Loading...</p>
      ) : (
        <p className={`mb-0 ${Styles.btnText}`}>{props.children}</p>
      )}
    </button>
  );
}

export default Button;
