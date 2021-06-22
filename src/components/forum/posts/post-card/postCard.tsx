import React from "react";
import Styles from "./postCard.module.scss";
import moment from "moment";
import { Colors } from "../../../../shared/colors";
import { useHistory } from "react-router-dom";

export default function PostCard({ post, forum_id }) {
  const history = useHistory();
  const headerText =
    post.headerText.length > 100
      ? post.headerText.substr(0, 100) + "..."
      : post.headerText;
  const bodyText =
    post.bodyText.length > 200
      ? post.bodyText.substr(0, 200) + "..."
      : post.bodyText;

  let likedSvgProperties = post.liked.isLiked
    ? { fill: Colors.accentColor, stroke: "none" }
    : { fill: "none", stroke: Colors.secondaryColor, strokeWidth: "2px" };
  return (
    <div
      className={Styles.cardBg}
      style={{ position: "relative" }}
      onClick={() => {
        history.push(`/forum/${forum_id}/posts/${post._id}`, {
          post,
        });
      }}
    >
      <div className="py-1 d-flex align-items-center">
        <div className="px-2">
          <img
            src={post.userId.imageUrl}
            alt="url"
            className={Styles.imgContainer}
          />
        </div>
        <div className="px-1">
          <p className={`mb-0 ${Styles.createdBy}`}>
            Posted by{" "}
            <span className={`${Styles.userName} px-2`}>
              {post.userId.userName}
            </span>
          </p>
        </div>
        <div className="ml-auto px-2">
          <p className={`mb-0 ${Styles.postedOn}`}>
            {moment(post.createdAt).fromNow()}
          </p>
        </div>
        <div className="px-2">{/* more option will come here  */}</div>
      </div>
      <div className="container-fluid p-2">
        <div className="row align-items-center">
          <div className="col-8">
            <p className={`mb-0 ${Styles.headingText}`}>{headerText}</p>
            <p className={`mb-0 ${Styles.bodyText}`}>{bodyText}</p>
            <div className="py-4">
              <div className="d-flex align-items-cneter">
                {post.tags &&
                  post.tags.map((tag) => {
                    return (
                      <div className="pr-3" key={tag}>
                        <div className={`px-3 py-1 ${Styles.tagBg}`}>
                          <p
                            className={`mb-0 ${Styles.tagText}`}
                            style={{ fontSize: "14px" }}
                          >
                            {tag}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-6">
                  {post.pinned ? (
                    <div className={`${Styles.pinnedBack} px-2 py-1`}>
                      <p className={`mb-0 ${Styles.pinnedText}`}>Pinned</p>
                    </div>
                  ) : null}
                </div>
                <div className="col-6">
                  {post.saved ? (
                    <div className={`${Styles.savedBack} px-2 py-1`}>
                      <p className={`mb-0 ${Styles.savedText}`}>Saved</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "15px", left: "20px" }}>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center px-2">
            <div className="pr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="prefix__favorite-24px"
                width="20"
                height="20"
                viewBox="0 0 23.77 23.77"
              >
                <path
                  id="prefix__Path_228"
                  fill="none"
                  d="M0 0h23.77v23.77H0z"
                  data-name="Path 228"
                />
                <path
                  id="prefix__Path_229"
                  {...likedSvgProperties}
                  d="M11.9 21.174l-1.436-1.307C5.367 15.242 2 12.191 2 8.447A5.394 5.394 0 0 1 7.447 3 5.931 5.931 0 0 1 11.9 5.07 5.931 5.931 0 0 1 16.361 3a5.394 5.394 0 0 1 5.447 5.447c0 3.744-3.367 6.794-8.468 11.43z"
                  data-name="Path 229"
                  transform="translate(-.019 -.029)"
                />
              </svg>
            </div>
            <div className="px-1">
              <p className={`mb-0 ${Styles.likeText}`}>{post.liked.count}</p>
            </div>
          </div>
          <div className="d-flex align-items-center px-2">
            <div className="pr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 23.715 21"
              >
                <g
                  id="prefix__Speech_Bubble_48_"
                  transform="translate(.5 -30.048)"
                >
                  <g
                    id="prefix__Group_59"
                    data-name="Group 59"
                    transform="translate(0 30.548)"
                  >
                    <path
                      id="prefix__Path_230"
                      fill="none"
                      stroke="#707070"
                      d="M3.307 50.548H1.7l1.136-1.138a3.851 3.851 0 0 0 1.1-2.278A8.117 8.117 0 0 1 0 40.29c0-4.832 4.441-9.742 11.4-9.742 7.368 0 11.319 4.518 11.319 9.319 0 4.832-3.993 9.348-11.319 9.348a15.353 15.353 0 0 1-3.818-.486 5.964 5.964 0 0 1-4.27 1.819z"
                      data-name="Path 230"
                      transform="translate(0 -30.548)"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="px-1">
              <p className={`mb-0 ${Styles.commentText}`}>
                {post.comments.length}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className={`px-4 py-1 ${Styles.categoryBack}`}
        style={{
          position: "absolute",
          bottom: "-10px",
          right: "40px",
          border: `1px solid ${categoryColor.colour}`,
        }}
      >
        <div className="d-flex align-items-center">
          <div className="px-1">
            <div
              className={Styles.circle}
              style={{ background: categoryColor.colour }}
            ></div>
          </div>
          <div className="px-1">
            <p
              className={`mb-0 ${Styles.categoryText}`}
              style={{ color: categoryColor.colour }}
            >
              {categoryColor.text}
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
