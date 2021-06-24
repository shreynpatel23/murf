import React from "react";
import Styles from "./postEmptyState.module.scss";
import PostEmptyStateSvg from "../../../../shared/svg/postEmptyStateSvg";
import Button from "../../../../shared/button/button";
import { buttonTypes } from "../../../../shared/buttonTypes";
import { buttonSize } from "../../../../constants/button-size";
import { useHistory, useParams } from "react-router";

export default function PostEmptyState({ channel }: any) {
  const { id }: any = useParams();
  const history = useHistory();
  return (
    <div className="py-2">
      <div
        className={`${Styles.empty_state_back} d-flex justify-content-center`}
      >
        <div className="pb-4">
          <PostEmptyStateSvg />
          <div className="pt-4 pb-2">
            <p className={`mb-0 ${Styles.empty_state_header}`}>
              Go ahead and create your first post in{" "}
              <span className={Styles.channel_name}>
                {channel?.channel_name}
              </span>
            </p>
            <p className={`mb-0 ${Styles.empty_state_body_text}`}>
              Let Other people know what is going on your mind
            </p>
          </div>
          <div className="pt-2 pb-3 d-flex justify-content-center">
            <Button
              type={buttonTypes.PRIMARY}
              size={buttonSize.LARGE}
              onClick={() => {
                history.push(`/forum/${id}/add-post`, {
                  headingRef: null,
                  bodyRef: null,
                  channel_id: channel._id,
                });
              }}
            >
              New Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
