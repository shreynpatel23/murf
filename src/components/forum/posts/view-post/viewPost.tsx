import React, { useEffect, useState } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import Styles from "./viewPost.module.scss";
import PostCardStyles from "../post-card/postCard.module.scss";
import arrowSvg from "../../../../assets/images/arrow.svg";
import commentSvg from "../../../../assets/images/comment.svg";
import moreOptionSvg from "../../../../assets/images/more-option.svg";
// import { buttonSize } from "../../../../constants/button-size";
// import Button from "../../../../shared/button/button";
// import { buttonTypes } from "../../../../shared/buttonTypes";
import moment from "moment";
import { callGetApi, callPutApi } from "../../../../api/axios";
import Dropdown from "../../../../shared/dropdown/dropdown";
import PinSvg from "../../../../shared/svg/pin";
import SaveSvg from "../../../../shared/svg/save";
import EditSvg from "../../../../shared/svg/edit";
import DeleteSvg from "../../../../shared/svg/delete";

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
  const dropdownLinks = {
    PINNED: "Pinned",
    SAVED: "Saved",
    PIN: "Pin",
    SAVE: "Save",
    EDIT: "Edit",
    DELETE: "Delete",
  };
  const dropdownOptions = [
    {
      img: <PinSvg classes={Styles.svg} />,
      value: `${post?.pinned ? dropdownLinks.PINNED : dropdownLinks.PIN}`,
    },
    {
      img: <SaveSvg classes={Styles.svg} />,
      value: `${post?.saved ? dropdownLinks.SAVED : dropdownLinks.SAVE}`,
    },
    {
      img: <EditSvg classes={Styles.svg} />,
      value: dropdownLinks.EDIT,
    },
    {
      img: <DeleteSvg classes={Styles.svg} />,
      value: dropdownLinks.DELETE,
    },
  ];

  function handleBackNavigation() {
    history.push(`/forum/${forum_id}/posts`);
  }

  async function handlePinPost() {
    setLoading(true);
    try {
      const { data }: any = await callPutApi(`/posts/${post._id}/pin-post`, {
        pin: post.pinned ? "false" : "true",
      });
      setPost((post) => ({
        ...post,
        pinned: data.data,
      }));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  async function handleSavePost() {
    setLoading(true);
    try {
      const { data }: any = await callPutApi(`/posts/${post._id}/save-post`, {
        save: post.saved ? "false" : "true",
      });
      setPost((post) => ({
        ...post,
        saved: data.data,
      }));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  async function handleEditPost() {
    history.push(`/forum/${id}/add-post`, {
      headingRef: post.headerHTML,
      bodyRef: post.bodyHTML,
    });
  }
  async function handleDeletePost() {}

  return (
    <div className={Styles.view_post_wrapper}>
      {loading ? (
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
                <p className={`mb-0 ${Styles.view_post_back}`}>back to posts</p>
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
                      <PinSvg classes={Styles.pin} width="18" />
                    </div>
                  )}
                  {post?.saved && (
                    <div className="px-3">
                      <SaveSvg classes={Styles.save} width="13" />
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
                  {/* <div className="px-3"></div> */}
                  <div className="px-2">
                    <Dropdown
                      header={
                        <img
                          src={moreOptionSvg}
                          alt="option"
                          width="4px"
                          style={{ cursor: "pointer" }}
                        />
                      }
                      body_classes="dropdown-menu-right"
                      click={(value) => {
                        if (
                          value === dropdownLinks.PIN ||
                          value === dropdownLinks.PINNED
                        )
                          return handlePinPost();
                        if (
                          value === dropdownLinks.SAVE ||
                          value === dropdownLinks.SAVED
                        )
                          return handleSavePost();
                        if (value === dropdownLinks.EDIT)
                          return handleEditPost();
                        if (value === dropdownLinks.DELETE)
                          return handleDeletePost();
                      }}
                      options={dropdownOptions}
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
      )}
    </div>
  );
}
