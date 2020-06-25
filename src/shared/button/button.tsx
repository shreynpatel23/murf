import React from "react";
import Styles from "./button.module.scss";

function Button({ disabled, style, ...props }) {
  return (
    <button
      className={`${Styles.btn} ${props}`}
      style={style}
      disabled={disabled}
      {...props}
    >
      <p
        className={`mb-0 ${Styles.btnText}`}
        style={{ color: style.buttonTextColor }}
      >
        {props.children}
      </p>
    </button>
  );
}

export default Button;
