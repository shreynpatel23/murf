import React, { useState } from "react";
import Styles from "./createForum.module.scss";
import OnboardingSideBar from "../../../shared/on-boarding-side-bar/onBoardingSideBar";
import createForumImageSRC from "../../../assets/images/createForum.png";
import Input from "../../../shared/input/input";
import Button from "../../../shared/button/button";
import { primaryButtonStyle } from "../../../shared/buttonStyles";
import { useHistory } from "react-router-dom";

function CreateForum() {
  let history = useHistory();
  const [forumName, setForumName] = useState("");

  function handleForumName() {
    history.push("/setup-forum", { name: forumName });
  }
  return (
    <div className={`${Styles.background}`}>
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div
            className="col-xl-7 col-lg-12 d-flex align-items-center justify-content-center"
            style={{ height: "100vh" }}
          >
            <div className={Styles.formWrapper}>
              <div className="py-3">
                <p className={`mb-0 ${Styles.headingText}`}>
                  Give your forum a name
                </p>
              </div>
              <div className="py-2">
                <Input
                  type="text"
                  name="forumName"
                  id="forumName"
                  autoComplete="off"
                  placeholder="Enter Forum Name"
                  onChange={(event) => {
                    setForumName(event.target.value);
                  }}
                />
              </div>
              <div
                className="py-3"
                style={{ width: "200px", margin: "0 auto" }}
              >
                <Button
                  style={primaryButtonStyle}
                  disabled={forumName === ""}
                  onClick={handleForumName}
                >
                  Setup your forum
                </Button>
              </div>
            </div>
          </div>
          <div className="col-xl-5 d-none d-xl-block">
            <OnboardingSideBar
              img={
                <img
                  src={createForumImageSRC}
                  alt="create-forum"
                  height="500px"
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateForum;
