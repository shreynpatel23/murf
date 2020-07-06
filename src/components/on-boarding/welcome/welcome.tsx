import React, { useEffect } from "react";
import Styles from "./welcome.module.scss";

function Welcome() {
  useEffect(() => {
    // get forum by id API will come here
  }, []);
  return (
    <div className={`${Styles.background}`}>
      <p className="mb-0">hello from the get forum by id.</p>
    </div>
  );
}

export default Welcome;
