import React from "react";
import OnboardingSideBar from "../../../shared/on-boarding-side-bar/onBoardingSideBar";
import Button from "../../../shared/button/button";
import { primaryButtonStyle } from "../../../shared/buttonStyles";
import Styles from "./forumSetup.module.scss";
import setupForumIllustration from "../../../assets/images/setup-forum-illustration.png";
import Input from "../../../shared/input/input";
import { Colors } from "../../../shared/colors";
import { useLocation, useHistory } from "react-router-dom";
import AddNweForum from "../../../api/addNewForum";
import { Theme } from "../../../constants/theme";

function ForumSetup() {
  const {
    state: { name: forumName },
  } = useLocation();
  let history = useHistory();
  const user = JSON.parse(localStorage.getItem("@user"));
  const [userName, setUsername] = React.useState("");
  const [toggleSecondStep, setToggleSecondStep] = React.useState(false);
  const [forumTheme, setForumTheme] = React.useState(Theme[0]);
  const [loading, setLoading] = React.useState(false);
  function handleAddNewForum() {
    setLoading(true);
    AddNweForum(forumName, userName, forumTheme)
      .then(() => {
        setLoading(false);
        history.push("/welcome");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
      });
  }
  return (
    <div className={`${Styles.background}`}>
      {loading ? (
        <div
          style={{ height: "100%" }}
          className="d-flex align-items-center justify-content-center"
        >
          <p className="mb-0">Loading</p>
        </div>
      ) : (
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col-xl-7 col-lg-12">
              <div className={Styles.formWrapper}>
                <div className="py-4">
                  <p className={`mb-0 ${Styles.welcomeText}`}>
                    Hi,
                    <span style={{ color: Colors.accentColor }}>
                      {user.name}
                    </span>
                  </p>
                </div>
                {/* Step one here  */}
                <div>
                  <div className="py-3">
                    <p className={`mb-0 ${Styles.headingText}`}>
                      1. Set a username for your forum so people know where to
                      find you.
                    </p>
                  </div>
                  <div className="py-2">
                    <Input
                      type="text"
                      name="userName"
                      id="userName"
                      autoComplete="off"
                      placeholder="Enter your username"
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                  </div>
                  <div className="py-3" style={{ width: "150px" }}>
                    <Button
                      style={primaryButtonStyle}
                      disabled={userName === ""}
                      onClick={() => setToggleSecondStep(true)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
                {/* Step Two here  */}
                {toggleSecondStep ? (
                  <div className={Styles.slide}>
                    <div className="pt-3 pb-2">
                      <p className={`mb-0 ${Styles.headingText}`}>
                        2. Select a Theme for your forum
                      </p>
                    </div>
                    <div className="py-2 d-flex align-items-center">
                      {Theme.map((theme) => {
                        return (
                          <div className="px-3" key={theme}>
                            <label className={`mb-0 ${Styles.radioContainer}`}>
                              {theme}
                              <input
                                type="radio"
                                checked={forumTheme === theme}
                                name="radio"
                                onChange={() => setForumTheme(theme)}
                              />
                              <span className={Styles.checkmark}></span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    <div className="py-3" style={{ width: "150px" }}>
                      <Button
                        style={primaryButtonStyle}
                        disabled={userName === ""}
                        onClick={handleAddNewForum}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="col-xl-5 d-none d-xl-block">
              <OnboardingSideBar
                img={
                  <img
                    src={setupForumIllustration}
                    alt="create-forum"
                    height="300px"
                  />
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForumSetup;
