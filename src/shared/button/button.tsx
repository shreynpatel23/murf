import React from "react";
import Styles from "./button.module.scss";

function Button({ style, ...props }) {
  return (
    <button
      className={`${Styles.btn} px-4 py-3 ${props}`}
      style={style}
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
