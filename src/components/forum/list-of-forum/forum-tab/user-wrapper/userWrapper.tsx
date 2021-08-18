import React from "react";
import Styles from "./userWrapper.module.scss";

export default function UserWrapper(props) {
  const { user } = props;
  return (
    <div className={Styles.user_wrapper}>
      {user.imageUrl !== "" ? (
        <img
          src={user.imageUrl}
          alt="profile_pic"
          className={Styles.profile_picture}
        />
      ) : (
        <div
          className={`${Styles.profile_picture} d-flex align-items-center justify-content-center`}
        >
          <p className={Styles.user_initial}>{user.name[0].toUpperCase()}</p>
        </div>
      )}
      <p className={Styles.user_name}>{user.name}</p>
    </div>
  );
}
