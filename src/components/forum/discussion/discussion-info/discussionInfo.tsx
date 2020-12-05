import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

function DiscussionInfo() {
  const {
    state: { discussion },
  } = useLocation();
  const postHeaderRef = useRef();
  const postBodyRef = useRef();
  useEffect(() => {
    const headerText: any = postHeaderRef?.current;
    const bodyText: any = postBodyRef?.current;
    headerText.innerHTML = discussion.headerHTML;
    bodyText.innerHTML = discussion.bodyHTML;
  });
  return (
    <div>
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
