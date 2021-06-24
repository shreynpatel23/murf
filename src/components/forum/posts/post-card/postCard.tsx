import React from "react";
import Styles from "./postCard.module.scss";
import moment from "moment";
import { useHistory } from "react-router-dom";

export default function PostCard({ post, forum_id }) {
  const history = useHistory();
  const headerText =
    post.headerText.length > 200
      ? post.headerText.substr(0, 200) + "..."
      : post.headerText;
  const bodyText =
    post.bodyText.length > 400
      ? post.bodyText.substr(0, 400) + "..."
      : post.bodyText;
  return (
    <div className="py-2">
      <div className={Styles.post_card_back}>
        <div className={`py-3 d-flex align-items-center ${Styles.post_header}`}>
          <div className="px-md-3 d-flex align-items-center">
            <img
              src={post.userId.imageUrl}
              alt="url"
              className={Styles.imgContainer}
            />
            <div className="px-1">
              <p className={`mb-0 ${Styles.post_posted_by}`}>
                Posted by {post?.userId.name}
              </p>
              <p className={`mb-0 ${Styles.post_posted_on}`}>
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </div>
        <div className="container-fluid py-3 px-4">
          <div
            className="row align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/forum/${forum_id}/posts/${post._id}`, {
                post,
              });
            }}
          >
            <div className="col-11">
              <p className={`mb-0 ${Styles.headingText}`}>{headerText}</p>
              <p className={`mb-0 ${Styles.bodyText}`}>{bodyText}</p>
              <div className="d-flex align-items-center">
                {post.tags.length > 0
                  ? post.tags.map((tag) => {
                      return (
                        <div className="pr-3 py-3" key={tag}>
                          <div className={`px-3 py-1 ${Styles.tagBg}`}>
                            <p className={`mb-0 ${Styles.tagText}`}>{tag}</p>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
