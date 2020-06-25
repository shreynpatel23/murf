import React from "react";
import Styles from "./input.module.scss";

function Input(props) {
  return (
    <div>
      <input className={Styles.formControl} {...props} />
    </div>
  );
}

export default Input;
