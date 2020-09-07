import React, { useState, useRef, useEffect } from "react";
import Styles from "./addDiscussion.module.scss";
import ReactQuill from "react-quill";
function AddDiscussion() {
  const quillRef = useRef(null);
  const [bodyText, setBodyText] = useState();
  const modules = {
    toolbar: [
      ["bold"], // toggled buttons
      ["italic"], // toggled buttons
      ["underline"], // toggled buttons
      ["strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];
  const handleChange = (range) => {
    setBodyText(range);
  };
  useEffect(() => {
    if (quillRef.current) {
      console.log(quillRef?.current.getEditor());
    }
  }, [quillRef]);
  return (
    <div className={Styles.background}>
      <div className={`${Styles.addDiscussionCard} p-5`}>
        <ReactQuill
          value={bodyText}
          onChange={(range) => handleChange(range)}
          placeholder="Enter text here"
          ref={quillRef}
          className={Styles.editor}
          modules={modules}
          formats={formats}
        />
      </div>
    </div>
  );
}

export default AddDiscussion;
