import React from "react";
import Styles from "./topNav.module.scss";
function TopNav() {
  const user = JSON.parse(localStorage.getItem("@user"));
  return (
    <div
      className={`py-3 px-2 d-flex align-items-center sticky-top ${Styles.background}`}
      style={{ zIndex: 2 }}
    >
      <div className="px-2">
        <p className={`mb-0 ${Styles.communityName}`}>Comunity Name</p>
      </div>
      <div className="px-3 ml-auto">notifi</div>
      <img
        src={user.imageUrl}
        alt="url"
        className={`px-2 ${Styles.profilePicture}`}
      />
    </div>
  );
}

export default TopNav;
