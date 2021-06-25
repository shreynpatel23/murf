import React from "react";
import Styles from "./postCard.module.scss";
import moment from "moment";
import { useHistory } from "react-router-dom";
import moreOptionSvg from "../../../../assets/images/more-option.svg";
import PinSvg from "../../../../shared/svg/pin";
import SaveSvg from "../../../../shared/svg/save";
import Dropdown from "../../../../shared/dropdown/dropdown";
import { callPutApi } from "../../../../api/axios";

export default function PostCard({
  post,
  forum_id,
  pinAPost,
  saveAPost,
  setLoading,
}) {
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
  ];

  const history = useHistory();
  const headerText =
    post.headerText.length > 200
      ? post.headerText.substr(0, 200) + "..."
      : post.headerText;
  const bodyText =
    post.bodyText.length > 400
      ? post.bodyText.substr(0, 400) + "..."
      : post.bodyText;

  async function handlePinPost() {
    setLoading(true);
    try {
      const { data }: any = await callPutApi(`/posts/${post._id}/pin-post`, {
        pin: post.pinned ? "false" : "true",
      });
      pinAPost({ pin_value: data.data, post_id: post._id });
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
      saveAPost({ save_value: data.data, post_id: post._id });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  return (
    <div className="py-2">
      <div className={Styles.post_card_back}>
        <div className={`py-2 d-flex align-items-center ${Styles.post_header}`}>
          <div className="px-md-3 px-sm-2 d-flex align-items-center my-1">
            {post.userId.imageUrl !== "" ? (
              <img
                src={post.userId.imageUrl}
                alt="url"
                className={Styles.imgContainer}
              />
            ) : (
              <div
                className={`${Styles.imgContainer} d-flex align-items-center justify-content-center`}
              >
                <p className="text-white mb-0">
                  {post.userId.name[0].toUpperCase()}
                </p>
              </div>
            )}
            <div className="px-1">
              <p className={`mb-0 ${Styles.post_posted_by}`}>
                Posted by {post?.userId.name}
              </p>
              <p className={`mb-0 ${Styles.post_posted_on}`}>
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
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
              <Dropdown
                header={
                  <div className="px-3" style={{ cursor: "pointer" }}>
                    <img src={moreOptionSvg} alt="option" width="4px" />
                  </div>
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
                }}
                options={dropdownOptions}
              />
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
