import React from "react";
import Styles from "../posts.module.scss";
import AddPostBannerSvg from "../../../../shared/svg/addPostBannerSvg";
import Button from "../../../../shared/button/button";
import { buttonTypes } from "../../../../shared/buttonTypes";
import { buttonSize } from "../../../../constants/button-size";
import { useHistory } from "react-router";

function AddPostBanner({ forum_id, channel_id }) {
  const history = useHistory();
  return (
    <div
      className="py-2 d-flex justify-content-center w-100 mx-auto"
      style={{ position: "relative" }}
    >
      <AddPostBannerSvg classes={Styles.new_post_card} />
      <div
        className={`${Styles.new_post_content_wrapper} d-flex justify-content-around align-items-center`}
      >
        <div className={`px-2 ${Styles.post_banner_text_placement}`}>
          <p className={`mb-0 ${Styles.post_banner_text}`}>
            Add Something exciting, <br />
            so that people can know what is going on in your mind
          </p>
        </div>
        <div className="px-2">
          <Button
            type={buttonTypes.PRIMARY}
            size={buttonSize.MEDIUM}
            onClick={() => {
              history.push(`/forum/${forum_id}/add-post`, {
                headingRef: null,
                bodyRef: null,
                channel_id: channel_id,
              });
            }}
          >
            New Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddPostBanner;
