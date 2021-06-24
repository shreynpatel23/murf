import React from "react";
import Styles from "./errorMessage.module.scss";

function ErrorMessage(props) {
  return <div className={`p-2 ${Styles.error_message}`}>{props.children}</div>;
}

export default ErrorMessage;
