import React from "react";
import { useHistory } from "react-router-dom";
import Styles from "./topNav.module.scss";
function TopNav({ forum_name, user = {} }: any) {
  const history = useHistory();
  return (
    <div
      className={`py-3 px-2 d-flex align-items-center sticky-top ${Styles.background}`}
      style={{ zIndex: 2 }}
    >
      <div className="px-2">
        <p className={`mb-0 ${Styles.communityName}`}>
          {forum_name ? forum_name : "Loading ..."}
        </p>
      </div>
      <div
        className="px-3 ml-auto"
        onClick={() => {
          localStorage.removeItem("@user");
          localStorage.removeItem("token");
          history.push("/login");
        }}
      >
        Logout
      </div>
      {Object.keys(user).length > 0 ? (
        user.imageUrl !== "" ? (
          <img
            src={user.imageUrl}
            alt="url"
            className={`mx-2 ${Styles.profilePicture}`}
          />
        ) : (
          <div
            className={`${Styles.profilePicture} d-flex align-items-center justify-content-center`}
          >
            <p className="text-white mb-0">{user.name[0].toUpperCase()}</p>
          </div>
        )
      ) : (
        "Loading ..."
      )}
    </div>
  );
}

export default TopNav;
