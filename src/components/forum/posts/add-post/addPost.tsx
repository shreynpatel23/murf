// import React, { useState, useRef, useEffect } from "react";
import React, { useRef, useState, useEffect } from "react";
import Styles from "./addPost.module.scss";
import Button from "../../../../shared/button/button";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { buttonSize } from "../../../../constants/button-size";
import Bold from "../../../../shared/svg/bold";
import Italic from "../../../../shared/svg/italic";
import Underline from "../../../../shared/svg/underline";
import StrikeThrough from "../../../../shared/svg/strikeThrough";
import UnorderList from "../../../../shared/svg/unorderList";
import OrderList from "../../../../shared/svg/orderList";
import Toast from "../../../../shared/toast/toast";
import { buttonTypes } from "../../../../shared/buttonTypes";
import { callPostApi } from "../../../../api/axios";
export default function AddPost() {
  const user = JSON.parse(localStorage.getItem("@user") || "{}");
  const {
    state: {
      headingRef: postHeaderRef,
      bodyRef: postBodyRef,
      channel_id: channelId,
    },
  }: any = useLocation();
  const [loading, setLoading] = React.useState(false);
  const { id }: any = useParams();
  const history = useHistory();
  const headingRef: any = useRef(null);
  const bodyRef: any = useRef(null);
  const [error, setError] = useState("");
  // const [selectedCategory, setSelectedCategory] = React.useState("");
  const [viewOnlyPost, setViewOnlyPost] = React.useState(false);
  let formatType = "";
  useEffect(() => {
    if (postHeaderRef !== null && postBodyRef !== null) {
      setViewOnlyPost(true);
      headingRef.current.innerHTML = postHeaderRef;
      bodyRef.current.innerHTML = postBodyRef;
    }
  }, [postHeaderRef, postBodyRef]);
  // use this function for creating a new post
  const handleAddPost = async () => {
    const headingTextRef = headingRef?.current;
    const bodyTextRef = bodyRef?.current;
    if (headingTextRef.innerText === "") {
      setError("Please provide a valid header for the post");
      return;
    }
    if (bodyTextRef.innerText === "") {
      setError("Please provide a valid description for the post");
      return;
    }
    setLoading(true);
    const headerText = headingTextRef.innerText;
    const bodyText = bodyTextRef.innerText;
    const headerHTML = headingTextRef.innerHTML;
    const bodyHTML = bodyTextRef.innerHTML;
    const tags = [];
    const comments = [];
    const pinned = false;
    const saved = false;
    const liked = {
      count: 0,
      isLiked: false,
    };
    try {
      const { data }: any = await callPostApi("posts/create-post", {
        headerText,
        headerHTML,
        bodyText,
        bodyHTML,
        tags,
        comments,
        pinned,
        saved,
        liked,
        userId: user._id,
        forumId: id,
        channelId: channelId,
      });
      setLoading(false);
      history.push(`/forum/${id}/posts/${data._id}`, {
        post: data,
      });
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  const handleUpdatePost = async () => {
    const headingTextRef = headingRef?.current;
    const bodyTextRef = bodyRef?.current;
    const headerText = headingTextRef.innerText;
    const bodyText = bodyTextRef.innerText;
    // const headerHTML = headingTextRef.innerHTML;
    // const bodyHTML = bodyTextRef.innerHTML;
    console.log(headerText);
    console.log(bodyText);
    // console.log();
    // console.log();
  };

  // use this function to create a list ordered as well as unordered.
  const addListStyle = (value: string) => {
    let listWrapper: any;
    let list: any;
    if (value === "unorder") {
      listWrapper = document.createElement(`ul`);
    } else if (value === "order") {
      listWrapper = document.createElement(`ol`);
    }
    list = document.createElement(`li`);
    listWrapper.appendChild(list);
    bodyRef?.current.appendChild(listWrapper);
  };

  const handleTextFormat = (value: string) => {
    if (value === "bold") {
      formatType = "bold";
    } else if (value === "italic") {
      formatType = "italic";
    } else if (value === "underline") {
      formatType = "underline";
    } else if (value === "strikeThrough") {
      formatType = "strikeThrough";
    }
    let selObj: any = window.getSelection();
    if (selObj.rangeCount > 0) {
      selObj.getRangeAt(0);
      window.document.execCommand(formatType);
    } else {
      console.log("empty string");
    }
  };

  return (
    <div className={`${Styles.background} p-4`}>
      {error && <Toast>{error}</Toast>}
      <div className={`${Styles.writing_container}`}>
        <div className={Styles.header_wrapper}>
          <div
            className={Styles.header}
            placeholder="Type something Heading text"
            contentEditable="true"
            ref={headingRef}
          ></div>
        </div>
        <div
          style={{
            height: "80%",
            overflow: "auto",
            padding: "20px",
          }}
        >
          <p
            className={Styles.bodyText}
            placeholder="Type something body text"
            contentEditable="true"
            ref={bodyRef}
          ></p>
        </div>
        <div className={Styles.actions}>
          <div>
            <div className="p-2">
              <div
                className={Styles.action_back}
                onClick={() => handleTextFormat("bold")}
              >
                <button className={Styles.button}>
                  <Bold width="15" height="15" />
                </button>
              </div>
            </div>
            <div className="p-2">
              <div
                className={Styles.action_back}
                onClick={() => handleTextFormat("italic")}
              >
                <button className={Styles.button}>
                  <Italic width="15" height="15" />
                </button>
              </div>
            </div>
            <div className="p-2">
              <div
                className={Styles.action_back}
                onClick={() => handleTextFormat("underline")}
              >
                <button className={Styles.button}>
                  <Underline width="15" height="15" />
                </button>
              </div>
            </div>
            <div className="p-2">
              <div
                className={Styles.action_back}
                onClick={() => handleTextFormat("strikeThrough")}
              >
                <button className={Styles.button}>
                  <StrikeThrough width="15" height="15" />
                </button>
              </div>
            </div>
            <div className="p-2">
              <div
                className={Styles.action_back}
                onClick={() => addListStyle("unorder")}
              >
                <button className={Styles.button}>
                  <UnorderList width="15" height="15" />
                </button>
              </div>
            </div>
            <div className="p-2">
              <div
                className={Styles.action_back}
                onClick={() => addListStyle("order")}
              >
                <button className={Styles.button}>
                  <OrderList width="15" height="15" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "10%" }} className="d-flex align-items-center">
          {!viewOnlyPost ? (
            <>
              <div className="pl-3">
                <Button
                  type={buttonTypes.CANCEL}
                  size={buttonSize.MEDIUM}
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  Cancel
                </Button>
              </div>
              <div className="pl-3 ml-auto">
                <Button
                  isLoading={loading}
                  type={buttonTypes.PRIMARY}
                  size={buttonSize.MEDIUM}
                  onClick={() => handleAddPost()}
                >
                  Add Post
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="pl-3">
                <Button
                  type={buttonTypes.CANCEL}
                  size={buttonSize.MEDIUM}
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  Cancel
                </Button>
              </div>
              <div className="pl-3 ml-auto">
                <Button
                  type={buttonTypes.PRIMARY}
                  size={buttonSize.MEDIUM}
                  onClick={() => handleUpdatePost()}
                >
                  Save
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}