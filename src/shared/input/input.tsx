import React from "react";
import Styles from "./input.module.scss";

function Input(props) {
  return (
    <div className={Styles.inputContainer}>
      <input className={Styles.formControl} {...props} />
      <label htmlFor={props.labelname} className={`${Styles.labelName} mb-0`}>
        {props.labelname}
      </label>
    </div>
  );
}

export default Input;
