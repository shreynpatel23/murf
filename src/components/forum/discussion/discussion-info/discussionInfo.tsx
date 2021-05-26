import React, { useRef, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { buttonSize } from "../../../../constants/button-size";
import Button from "../../../../shared/button/button";
import {
  primaryButtonStyle,
  primaryButtonHoverStyle,
} from "../../../../shared/buttonStyles";

function DiscussionInfo() {
  const {
    state: { discussion },
  }: any = useLocation();
  const { id }: any = useParams();
  const history = useHistory();
  const postHeaderRef = useRef();
  const postBodyRef = useRef();
  useEffect(() => {
    const headerText: any = postHeaderRef?.current;
    const bodyText: any = postBodyRef?.current;
    headerText.innerHTML = discussion.headerHTML;
    bodyText.innerHTML = discussion.bodyHTML;
  }, [discussion.headerHTML, discussion.bodyHTML]);
  return (
    <div>
      <Button
        hoverStyle={primaryButtonHoverStyle}
        size={buttonSize.LARGE}
        style={primaryButtonStyle}
        onClick={() => {
          history.push(`/forum/${id}/add-discussion`, {
            headingRef: discussion.headerHTML,
            bodyRef: discussion.bodyHTML,
          });
        }}
      >
        Update
      </Button>
      <div style={{ padding: "20px" }}>
        <div ref={postHeaderRef}></div>
      </div>
      <hr />
      <div style={{ padding: "20px" }}>
        <div ref={postBodyRef}></div>
      </div>
    </div>
  );
}

export default DiscussionInfo;
