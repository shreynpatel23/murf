// import React, { useState, useRef, useEffect } from "react";
import React, { useRef, useState } from "react";
import Styles from "./addDiscussion.module.scss";
import Button from "../../../../shared/button/button";
import { primaryButtonStyle } from "../../../../shared/buttonStyles";
import { useHistory } from "react-router-dom";
import addNewPost from "../../../../api/addNewPost";
function AddDiscussion() {
  const history = useHistory();
  const headingRef: any = useRef(null);
  const bodyRef: any = useRef(null);
  const [error, setError] = useState("");
  console.log(error);
  let formatType = "";

  // use this function for creating a new post
  const handleAddPost = async () => {
    const headingTextRef = headingRef?.current;
    const bodyTextRef = bodyRef?.current;
    const headerText = headingTextRef.innerText;
    const bodyText = bodyTextRef.innerText;
    const headerHTML = headingTextRef.innerHTML;
    let bodyHTML = bodyTextRef.innerHTML;
    const tags = [];
    const category = "Tech";
    const comments = [];
    const pinned = false;
    const saved = false;
    const liked = {
      count: 0,
      isLiked: false,
    };
    bodyHTML = JSON.stringify(bodyHTML);
    console.log(bodyHTML);
    const discussion: any = await addNewPost({
      headerText,
      bodyText,
      headerHTML,
      bodyHTML,
      tags,
      category,
      comments,
      pinned,
      saved,
      liked,
    }).catch((err) => {
      console.log(err);
    });
    history.push(`/forum/discussion/${discussion.data._id}`, {
      discussion: discussion.data,
    });
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

  const uploadFile = (file: any) => {
    // added check for the file type
    if (
      file.name.includes("jpeg") ||
      file.name.includes("jpg") ||
      file.name.includes("png")
    ) {
      // added basic check for the comparing the file size. if it is less than 2MB.
      if (file.size < 2000000) {
        const reader = new FileReader();
        // converting the image name into base64 url
        reader.readAsDataURL(file);
        reader.onload = (event: any) => {
          let image = document.createElement(`img`);
          image.src = event.target.result;
          image.alt = "uploaded_image";
          image.style.padding = "20px";
          image.style.width = "50%";
          image.style.height = "50%";
          image.height = 200;
          bodyRef?.current.appendChild(image);
          setError("");
        };
      } else {
        setError("file should be less than 2 MB");
        return;
      }
    } else {
      // throw error that we only support png and jpeg files.
      setError("Image should be in png or jpeg format");
      return;
    }
  };

  return (
    <div className={`${Styles.background} px-4 py-5`}>
      <div style={{ height: "10%" }} className="d-flex align-items-center">
        <div
          className={Styles.header}
          placeholder="Type something Heading text"
          contentEditable="true"
          ref={headingRef}
        ></div>
      </div>
      <div style={{ height: "5%" }}>
        <div
          style={{ display: "flex", padding: "10px 0", alignItems: "center" }}
        >
          <button onClick={() => handleTextFormat("bold")}>bold</button>
          <button onClick={() => handleTextFormat("italic")}>Italic</button>
          <button onClick={() => handleTextFormat("underline")}>
            UnderLine
          </button>
          <button onClick={() => handleTextFormat("strikeThrough")}>
            strike through
          </button>
          <button onClick={() => addListStyle("unorder")}>UL</button>
          <button onClick={() => addListStyle("order")}>LI</button>
          <button>
            <label htmlFor="uploadImage">
              upload image
              <input
                id="uploadImage"
                accept="image/png, image/jpeg"
                type="file"
                onChange={(e: any) => {
                  uploadFile(e.target.files[0]);
                }}
                style={{ visibility: "hidden", display: "none" }}
              />
            </label>
          </button>
        </div>
      </div>
      <div style={{ height: "80%", overflow: "auto", padding: "20px" }}>
        <p
          className={Styles.bodyText}
          placeholder="Type something body text"
          contentEditable="true"
          ref={bodyRef}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadFile(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDragLeave={(e) => {
            e.preventDefault();
          }}
        ></p>
      </div>
      <div
        style={{ height: "5%" }}
        className="d-flex align-items-center justify-content-end"
      >
        <div style={{ width: "150px" }}>
          <Button style={primaryButtonStyle} onClick={() => handleAddPost()}>
            Add Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddDiscussion;
