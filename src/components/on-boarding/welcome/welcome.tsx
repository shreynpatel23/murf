import React, { useEffect, useState } from "react";
import Styles from "./welcome.module.scss";
import getForumById from "../../../api/getForumById";
import welcomeIllustration from "../../../assets/images/welcome-illustration.svg";
import Button from "../../../shared/button/button";
import {
  primaryButtonStyle,
  borderButtonStyle,
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
    createdAt: new Date(),
  });
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    // get forum by id API will come here
    async function getForumDetails() {
      setLoading(true);
      try {
        const { data }: any = await getForumById(forumId);
        setForum((forum) => ({
          ...forum,
          forumName: data.forum_name,
          createdAt: new Date(data.createdAt),
        }));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }

    getForumDetails();
  }, [forumId]);
  return (
    <div className={`${Styles.background}`}>
      <div
        style={{ height: "100%" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className={Styles.card_wrapper}>
          {loading ? (
            <p>Loading....</p>
          ) : (
            <div className="text-center">
              <img
                src={welcomeIllustration}
                alt="welcome"
                className={`py-3 ${Styles.welcome_image}`}
              />
              <div className="py-2">
                <p className={`mb-0 ${Styles.heading_text} py-2`}>
                  Congratulations
                </p>
                <p className={`mb-0 ${Styles.body_text} py-2`}>
                  You have successfully created your forum{" "}
                  <span className={Styles.forum_name}>{forum.forumName}</span>{" "}
                  <br /> on{" "}
                  <span
                    className={Styles.created_by}
                  >{`${forum.createdAt.getDate()}/${
                    forum.createdAt.getMonth() + 1
                  }/${forum.createdAt.getFullYear()}`}</span>
                  . Go ahead and create your first post in the forum
                </p>
              </div>
              <div className="pt-4 d-flex justify-content-center">
                <Button
                  hoverStyle={borderButtonStyle}
                  size={buttonSize.LARGE}
                  style={primaryButtonStyle}
                  onClick={() => history.push(`/forum/${forumId}`)}
                >
                  Manage your forum
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={Styles.card_container}></div>
    </div>
  );
}

export default Welcome;
