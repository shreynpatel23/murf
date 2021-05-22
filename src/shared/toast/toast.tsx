import React from "react";
import Styles from "./toast.module.scss";

function Toast(props) {
  return <div className={Styles.toast_back}>{props.children}</div>;
}

export default Toast;
