import React from "react";
import { useHistory } from "react-router";
import { ICreatedBy } from "../../../../types/forum";
import Styles from "./forumTab.module.scss";
import UserWrapper from "./user-wrapper/userWrapper";

export default function ForumTab(props) {
  const { forum } = props;
  const history = useHistory();
  return (
    <div
      className={Styles.tab_back}
      onClick={() => history.push(`/forum/${forum._id}/posts`)}
    >
      <div className={`px-2 ${Styles.name_column}`}>
        <p className={`mb-0 ${Styles.forum_name}`}>{forum.forum_name}</p>
        <p className={`mb-0 ${Styles.create_at}`}>
          Created by {forum.createdBy.name}
        </p>
      </div>
      <div className={`px-2 ${Styles.theme_column}`}>
        <p className={`mb-0 ${Styles.forum_name}`}>{forum.theme}</p>
      </div>
      <div className={`px-2 ${Styles.channel_length_column}`}>
        <p className={`mb-0 ${Styles.forum_name}`}>{forum.channels.length}</p>
      </div>
      <div className={`px-2 ${Styles.members_column}`}>
        {forum.users.map((user: ICreatedBy) => {
          return (
            <div className="p-2" key={user.Id}>
              <UserWrapper user={user} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
