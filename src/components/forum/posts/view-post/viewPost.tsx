import React, { useEffect, useState } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import Styles from "./viewPost.module.scss";
import PostCardStyles from "../post-card/postCard.module.scss";
import arrowSvg from "../../../../assets/images/arrow.svg";
import pinnedSvg from "../../../../assets/images/pin.svg";
import savedSvg from "../../../../assets/images/save.svg";
import commentSvg from "../../../../assets/images/comment.svg";
import moreOptionSvg from "../../../../assets/images/more-option.svg";
// import { buttonSize } from "../../../../constants/button-size";
// import Button from "../../../../shared/button/button";
// import { buttonTypes } from "../../../../shared/buttonTypes";
import moment from "moment";
import { callGetApi } from "../../../../api/axios";

export default function ViewPost() {
  const location = useLocation();
  const forum_id = location.pathname.split("/")[2];
  const { id }: any = useParams();
  const history = useHistory();
  const [post, setPost] = useState<any>();
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    async function getPostById() {
      setLoading(true);
      try {
        const { data }: any = await callGetApi(`/posts/${id}`);
        setPost(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
    getPostById();
  }, [id]);

  function handleBackNavigation() {
    history.push(`/forum/${forum_id}/posts`);
  }
  return (
    <div className={Styles.view_post_wrapper}>
      {
        loading ? (
          <div
            style={{ height: "calc(100vh - 72px)" }}
            className="d-flex align-items-center justify-content-center"
          >
            <p>Loading...</p>
          </div>
        ) : (
          <div className="py-2">
            {/* Back Navigation  */}
            <div className="d-inline-block">
              <div
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={handleBackNavigation}
              >
                <div className="pr-2">
                  <img src={arrowSvg} alt="arrow" width="5px" />
                </div>
                <div className="pr-2">
                  <p className={`mb-0 ${Styles.view_post_back}`}>
                    back to posts
                  </p>
                </div>
              </div>
            </div>
            {/* Header Section  */}
            <div className="py-3">
              <p
                className={`mb-0 ${Styles.post_header}`}
                // ref={postHeaderRef}
                dangerouslySetInnerHTML={{ __html: post?.headerHTML }}
              ></p>
            </div>
            {/* Posted by section  */}
            <div className="py-3">
              <div className="d-flex align-items-center">
                {post.userId.imageUrl !== "" ? (
                  <img
                    src={post.userId.imageUrl}
                    alt="url"
                    className={PostCardStyles.imgContainer}
                  />
                ) : (
                  <div
                    className={`${PostCardStyles.imgContainer} d-flex align-items-center justify-content-center`}
                  >
                    <p className="text-white mb-0">
                      {post.userId.name[0].toUpperCase()}
                    </p>
                  </div>
                )}
                <div className="px-1">
                  <p className={`mb-0 ${PostCardStyles.post_posted_by}`}>
                    Posted by {post?.userId.name}
                  </p>
                  <p className={`mb-0 ${PostCardStyles.post_posted_on}`}>
                    {moment(post?.createdAt).fromNow()}
                  </p>
                </div>
                <div className="ml-auto px-2">
                  <div className="d-flex align-items-center">
                    {post?.pinned && (
                      <div className="px-3">
                        <img src={pinnedSvg} alt="pin" width="20px" />
                      </div>
                    )}
                    {post?.saved && (
                      <div className="px-3">
                        <img src={savedSvg} alt="save" width="15px" />
                      </div>
                    )}
                    <div className="px-3">
                      <div className="d-flex align-items-center">
                        <img src={commentSvg} alt="comment" width="20px" />
                        <p className={`mb-0 px-2 ${Styles.number_of_comments}`}>
                          {post?.comments.length}
                        </p>
                      </div>
                    </div>
                    <div className="px-3"></div>
                    <div className="px-2">
                      <img
                        src={moreOptionSvg}
                        alt="option"
                        width="4px"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Tags  */}
            {post?.tags.length > 0 ? (
              <div className="py-2">
                <div className="d-flex align-items-center">
                  {post.tags.map((tag) => {
                    return (
                      <div className="pr-3 py-3" key={tag}>
                        <div className={`px-3 py-1 ${PostCardStyles.tagBg}`}>
                          <p className={`mb-0 ${PostCardStyles.tagText}`}>
                            {tag}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {/* Post body section  */}
            <div className="py-3">
              <p
                className={`mb-0 ${Styles.post_body}`}
                dangerouslySetInnerHTML={{ __html: post?.bodyHTML }}
              ></p>
            </div>
            <hr />
            {/* Post Comments  */}
            {/* <div className="py-2"></div> */}
          </div>
        )
        /* <Button
        type={buttonTypes.PRIMARY}
        size={buttonSize.LARGE}
        onClick={() => {
          history.push(`/forum/${id}/add-post`, {
            headingRef: post.headerHTML,
            bodyRef: post.bodyHTML,
          });
        }}
      >
        Update
      </Button> */
      }
    </div>
  );
}
