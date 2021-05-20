import React, { useState } from "react";
import Styles from "./button.module.scss";
import { buttonSize } from "../../constants/button-size";

function Button({ style, hoverStyle, size, ...props }) {
  const [buttonStyle, setButtonStyle] = useState(style);
  return (
    <button
      className={`${Styles.button} ${
        size === buttonSize.LARGE ? Styles.largeButton : Styles.mediumButton
      } d-flex align-items-center justify-content-center`}
      style={buttonStyle}
      onMouseOver={() => setButtonStyle(hoverStyle)}
      onMouseOut={() => setButtonStyle(style)}
      {...props}
    >
      <p
        className={`mb-0 ${Styles.btnText}`}
        style={{ color: buttonStyle.color }}
      >
        {props.children}
      </p>
    </button>
  );
}

export default Button;
