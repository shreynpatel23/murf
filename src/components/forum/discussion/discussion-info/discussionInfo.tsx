import React from "react";
import { useLocation } from "react-router-dom";

function DiscussionInfo() {
  const {
    state: { discussion },
  } = useLocation();
  console.log(discussion);
  return (
    <div>
      <p className="mb-0">{discussion.headerText}</p>
      <p className="mb-0">{discussion.bodyText}</p>
      <p className="mb-0">{discussion.category}</p>
    </div>
  );
}

export default DiscussionInfo;
