import React, { useEffect, useState } from "react";
import Styles from "./welcome.module.scss";
import getForumById from "../../../api/getForumById";
import welcomeIllustration from "../../../assets/images/welcome-illustration.svg";
import Button from "../../../shared/button/button";
import {
  primaryButtonStyle,
  primaryButtonHoverStyle,
} from "../../../shared/buttonStyles";
import { useHistory, useLocation } from "react-router-dom";
import { buttonSize } from "../../../constants/button-size";

function Welcome() {
  const {
    state: { forumId },
  }: any = useLocation();
  let history = useHistory();
  const [forum, setForum] = useState({
    forumName: "",
    createdAt: "",
    userName: "",
  });
  useEffect(() => {
    // get forum by id API will come here
    getForumById(forumId)
      .then((response: any) => {
        setForum(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setForum, forumId]);
  return (
    <div className={`${Styles.background}`}>
      <div
        style={{
          objectFit: "cover",
          overflow: "hidden",
          width: "100%",
          opacity: "0.4",
        }}
        className="pb-5
        "
      >
        <img src={welcomeIllustration} alt="welcomeIllustration" />
      </div>
      <div className="py-5 text-center">
        <div className="py-2">
          <p className={`mb-0 ${Styles.forumName}`}>{forum.forumName}</p>
          <div className="py-1">
            <p className={`mb-0 ${Styles.createdBy}`}>
              created by @{forum.userName} at {forum.createdAt}
            </p>
          </div>
        </div>
        <div className="py-3" style={{ width: "250px", margin: "0 auto" }}>
          <Button
            hoverStyle={primaryButtonHoverStyle}
            size={buttonSize.LARGE}
            style={primaryButtonStyle}
            onClick={() => history.push(`/forum/${forumId}`)}
          >
            Manage your forum
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
