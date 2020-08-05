import React, { useState } from "react";
import register from "../../../api/register";
import Styles from "./addUsername.module.scss";
import { useLocation, useHistory } from "react-router-dom";
import Input from "../../../shared/input/input";
import OnboardingSideBar from "../../../shared/on-boarding-side-bar/onBoardingSideBar";
import createForumImageSRC from "../../../assets/images/createForum.png";
import Button from "../../../shared/button/button";
import { primaryButtonStyle } from "../../../shared/buttonStyles";

function AddUsername() {
  const {
    state: { name, email, imageUrl },
  } = useLocation();
  let history = useHistory();
  const [userName, setUserName] = useState("");
  function handleRegister() {
    try {
      register(name, email, imageUrl, userName)
        .then((response: any) => {
          localStorage.setItem("@user", JSON.stringify(response.data));
          history.replace("/setup-forum");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (err) {
      console.log(err.response.data);
    }
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
                <p className={`mb-0 ${Styles.headingText}`}>Enter a username</p>
              </div>
              <div className="py-2">
                <Input
                  type="text"
                  name="forumName"
                  id="forumName"
                  autoComplete="off"
                  placeholder="Enter Forum Name"
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
              </div>
              <div
                className="py-3"
                style={{ width: "200px", margin: "0 auto" }}
              >
                <Button
                  style={primaryButtonStyle}
                  disabled={userName === ""}
                  onClick={handleRegister}
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

export default AddUsername;
