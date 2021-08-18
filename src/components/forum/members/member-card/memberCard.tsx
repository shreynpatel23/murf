import React from "react";
import Styles from "./memberCard.module.scss";

export default function MemberCard(props) {
  const { user } = props;
  return (
    <div className={Styles.card_back}>
      <div className={`py-3 ${Styles.profile_picture_placement}`}>
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
      </div>
      <div className="pb-2">
        <p className={Styles.user_name}>{user.name}</p>
      </div>
      <div className="pb-2">
        <p className={Styles.user_email}>{user.email}</p>
      </div>
    </div>
  );
}
