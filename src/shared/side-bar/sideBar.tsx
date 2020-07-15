import React from "react";
import Styles from "./sideBar.module.scss";
import { sideBarItems } from "../../constants/sideBar";
import { useLocation, useHistory } from "react-router-dom";

function SideBar() {
  let location = useLocation();
  let history = useHistory();
  const strArr = location.pathname.split("/");
  function navigateTo(value) {
    history.push(`/forum/${value.toLowerCase()}`);
  }
  return (
    <div
      className="py-2 px-4 sticky-top"
      style={{ height: "75vh", top: "80px" }}
    >
      {sideBarItems.map((sideBarItem) => {
        return (
          <div key={sideBarItem}>
            <div
              className={`px-4 py-3 m-2 ${
                strArr.includes(sideBarItem.toLowerCase())
                  ? Styles.activeTab
                  : Styles.nonActiveTab
              }`}
              onClick={() => navigateTo(sideBarItem)}
            >
              <p
                className={`mb-0 ${
                  strArr.includes(sideBarItem.toLowerCase())
                    ? Styles.activeTabText
                    : Styles.nonActiveTabText
                }`}
              >
                {sideBarItem}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SideBar;
