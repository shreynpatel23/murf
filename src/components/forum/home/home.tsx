import React from "react";
import Styles from "./home.module.scss";
import welcomeSRC from "../../../assets/images/welcome illustration.png";

function Home() {
  const user = localStorage.getItem("@user" || "");
  return (
    <div
      style={{ minHeight: "80vh", height: "100%" }}
      className="d-flex align-items-center"
    >
      <div>
        <div className="py-2">
          <img src={welcomeSRC} alt="welcome" height="150px" />
        </div>
        <div className="py-2">
          <p className={`mb-0 ${Styles.welcomeText}`}>Hi, {JSON.parse(user).name}</p>
        </div>
        <div className="py-2"></div>
      </div>
    </div>
  );
}

export default Home;
