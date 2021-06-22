import React, { useRef, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { buttonSize } from "../../../../constants/button-size";
import Button from "../../../../shared/button/button";
import { buttonTypes } from "../../../../shared/buttonTypes";

export default function ViewPost() {
  const {
    state: { post },
  }: any = useLocation();
  console.log(post);
  const { id }: any = useParams();
  const history = useHistory();
  const postHeaderRef = useRef();
  const postBodyRef = useRef();
  useEffect(() => {
    const headerText: any = postHeaderRef?.current;
    const bodyText: any = postBodyRef?.current;
    headerText.innerHTML = post.headerHTML;
    bodyText.innerHTML = post.bodyHTML;
  }, [post.headerHTML, post.bodyHTML]);
  return (
    <div>
      <Button
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
