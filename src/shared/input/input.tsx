import React from "react";
import Styles from "./input.module.scss";

function Input(props) {
  const { labelname, hasError } = props;
  return (
    <div className={Styles.inputContainer}>
      <input
        className={hasError ? Styles.error : Styles.formControl}
        {...props}
      />
      <label htmlFor={labelname} className={`${Styles.labelName} mb-0`}>
        {labelname}
      </label>
    </div>
  );
}

export default Input;
