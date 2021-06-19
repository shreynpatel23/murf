import React, { useState } from "react";
import Styles from "./createForum.module.scss";
import Input from "../../../shared/input/input";
import Button from "../../../shared/button/button";
import {
  primaryButtonStyle,
  borderButtonStyle,
} from "../../../shared/buttonStyles";
import { buttonSize } from "../../../constants/button-size";
import OnBoardingCard from "../../auth/on-boarding-card/onBoardingCard";
import { Theme } from "../../../constants/theme";
import RadioButton from "../../../shared/radio-button/radioButton";
import { Colors } from "../../../shared/colors";
import TickSvg from "../../../shared/svg/tickSvg";
import { useHistory } from "react-router-dom";
import { callPostApi } from "../../../api/axios";

function CreateForum() {
  let history = useHistory();
  const user = JSON.parse(localStorage.getItem("@user"));
  const [forumName, setForumName] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [forumTheme, setForumTheme] = React.useState("");
  const [currentOpenAccordion, setCurrentOpenAccordion] = React.useState(1);
  async function handleAddNewForum() {
    setLoading(true);
    try {
      const response = await callPostApi("/forums/create-forum", {
        forum_name: forumName,
        theme: forumTheme,
        userId: user._id,
      });
      setLoading(false);
      const { data }: any = response;
      history.push("/welcome", { forumId: data._id });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={`${Styles.background} p-3 d-flex justify-content-end`}>
      <OnBoardingCard
        headerText="Create your Forum"
        subText="Create your forun in two simple steps"
      >
        <div style={{ height: "80%" }}>
          <div style={{ height: "80%" }}>
            <div className={`${Styles.stepsWrapper}`}>
              <div id="accordion">
                <div className="py-2">
                  <div
                    className="d-flex align-items-center py-2"
                    id="stepOne"
                    data-toggle="collapse"
                    data-target="#forumName"
                    aria-expanded="true"
                    aria-controls="forumName"
                  >
                    <div style={{ width: "15%" }}>
                      <div
                        className={`${Styles.stepNumberWrapper} d-flex align-items-center justify-content-center`}
                        style={{
                          border: `2px solid ${
                            forumName !== ""
                              ? Colors.accentColor
                              : Colors.secondaryColor
                          }`,
                        }}
                      >
                        {forumName !== "" ? (
                          <TickSvg width="25" height="15" />
                        ) : (
                          <p className={`mb-0 ${Styles.stepNumber}`}>01</p>
                        )}
                      </div>
                    </div>
                    <div style={{ width: "85%" }} className="px-2">
                      <p className={`mb-0 ${Styles.stepDescription}`}>
                        Enter Name of Forum
                      </p>
                    </div>
                  </div>

                  <div
                    id="forumName"
                    className={`collapse ${
                      currentOpenAccordion === 1 ? "show" : ""
                    }`}
                    aria-labelledby="stepOne"
                    data-parent="#accordion"
                  >
                    <div className="d-flex align-items-centere">
                      <div style={{ width: "15%" }}></div>
                      <div style={{ width: "85%" }} className="px-2">
                        <div className="py-3">
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="off"
                            placeholder="Enter Forum Name"
                            onChange={(event) => {
                              setForumName(event.target.value);
                            }}
                          />
                        </div>
                        <div className="pt-1">
                          <Button
                            hoverStyle={borderButtonStyle}
                            size={buttonSize.MEDIUM}
                            style={primaryButtonStyle}
                            disabled={forumName === ""}
                            onClick={() => setCurrentOpenAccordion(2)}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <div
                    className="d-flex align-items-center py-2"
                    id="stepTwo"
                    data-toggle="collapse"
                    data-target="#forumTheme"
                    aria-expanded="false"
                    aria-controls="forumTheme"
                  >
                    <div style={{ width: "15%" }}>
                      <div
                        className={`${Styles.stepNumberWrapper} d-flex align-items-center justify-content-center`}
                        style={{
                          border: `2px solid ${
                            forumTheme !== ""
                              ? Colors.accentColor
                              : Colors.secondaryColor
                          }`,
                        }}
                      >
                        {forumTheme !== "" ? (
                          <TickSvg width="25" height="15" />
                        ) : (
                          <p className={`mb-0 ${Styles.stepNumber}`}>02</p>
                        )}
                      </div>
                    </div>
                    <div style={{ width: "85%" }} className="px-2">
                      <p className={`mb-0 ${Styles.stepDescription}`}>
                        Select a Theme for the forum
                      </p>
                    </div>
                  </div>

                  <div
                    id="forumTheme"
                    className={`collapse ${
                      currentOpenAccordion === 2 ? "show" : ""
                    }`}
                    aria-labelledby="stepTwo"
                    data-parent="#accordion"
                  >
                    <div className="d-flex align-items-centere">
                      <div style={{ width: "15%" }}></div>
                      <div style={{ width: "85%" }} className="px-2">
                        <div className="py-2 row">
                          {Theme.map((theme) => {
                            return (
                              <div className="col-6 py-2" key={theme}>
                                <RadioButton
                                  type="radio"
                                  name="radio"
                                  change={() => setForumTheme(theme)}
                                  checked={forumTheme === theme}
                                  value={theme}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ height: "20%" }}
            className="d-flex align-items-start justify-content-center"
          >
            <Button
              isLoading={loading}
              disabled={forumName === "" || forumTheme === "" || loading}
              hoverStyle={borderButtonStyle}
              style={primaryButtonStyle}
              size={buttonSize.LARGE}
              onClick={handleAddNewForum}
            >
              Create Forum
            </Button>
          </div>
        </div>
      </OnBoardingCard>
    </div>
  );
}

export default CreateForum;
