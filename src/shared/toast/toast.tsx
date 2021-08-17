import React, { useState } from "react";
import { SUCCESS } from "../../types/toastTypes";
import { Colors } from "../colors";
import Close from "../svg/close";
import Styles from "./toast.module.scss";

export default function RenderToast(props) {
  const { type, message, click } = props;
  const [dismissToast, setDismissToast] = useState(false);
  return (
    <div
      className={`${Styles.toast_back} ${
        dismissToast ? Styles.slide_out : ""
      } d-flex align-items-center`}
      style={{
        borderLeft:
          type === SUCCESS
            ? `10px solid ${Colors.success}`
            : `10px solid ${Colors.error}`,
      }}
    >
      <div className={Styles.indicator}></div>
      <p
        className={`mb-0 ${Styles.toast_message_text} flex-grow-1`}
        style={{
          color: type === SUCCESS ? Colors.success : Colors.error,
        }}
      >
        {message}
      </p>
      <div className="px-2">
        <Close
          width="10"
          height="10"
          classes={Styles.close_icon}
          onClick={() => {
            setDismissToast(true);
            click();
          }}
        />
      </div>
    </div>
  );
}
