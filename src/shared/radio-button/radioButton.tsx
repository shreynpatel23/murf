import React from "react";
import Styles from "./radioButton.module.scss";

function RadioButton({ value, checked, change, ...props }) {
  return (
    <div
      className={checked ? Styles.checkedRadioWrapper : Styles.radioWrapper}
      onClick={() => change(value)}
    >
      <label className={`mb-0 ${Styles.radioContainer}`}>
        {value}
        <input {...props} checked={checked} onChange={() => change(value)} />
        <span className={Styles.checkmark}></span>
      </label>
    </div>
  );
}

export default RadioButton;
