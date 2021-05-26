import React, { useContext, useState, useEffect } from "react";
import Styles from "./discussion.module.scss";
import { CategoryContext } from "../../../context/categoryContext";
import getAllPosts from "../../../api/getAllPosts";
import DiscussionCard from "./discussion-card/discussionCard";
import Button from "../../../shared/button/button";
import {
  primaryButtonStyle,
  primaryButtonHoverStyle,
} from "../../../shared/buttonStyles";
import { categoryArray } from "../../../constants/categary";
import { useLocation, useHistory } from "react-router-dom";
import { buttonSize } from "../../../constants/button-size";

function Discussion() {
  let history = useHistory();
  const [discussions, setDiscussions] = useState([]);
  let categoryColor = {};
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  useEffect(() => {
    getAllPosts(id)
      .then((response: any) => {
        setDiscussions(response.data.sort(compare));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  function compare(a) {
    //  we are using this variable to enter number so that we can sort based upon the number
    let comparison = 0;
    if (a.pinned) {
      comparison = -1;
    } else {
      comparison = 1;
    }
    return comparison;
  }
  const categoryContext = useContext(CategoryContext);
  return (
    <div className="py-4">
      <div className="p-3">
        <div className={Styles.newPostCard}>
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-9">
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Porro libero velit officiis dignissimos officia unde, modi
                  omnis quos placeat ab magnam labore culpa, temporibus eos
                  aliquid ut repellat sed vero?
                </p>
              </div>
              <div className="col-3">
                <Button
                  hoverStyle={primaryButtonHoverStyle}
                  size={buttonSize.MEDIUM}
                  style={primaryButtonStyle}
                  onClick={() => {
                    history.push(`/forum/${id}/add-discussion`, {
                      headingRef: null,
                      bodyRef: null,
                    });
                  }}
                >
                  New Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {discussions
        .filter((discussion: any) => {
          return discussion.category.includes(
            categoryContext.category.toLowerCase()
          );
        })
        .map((discussion: any, index) => {
          categoryColor = categoryArray.find((category) => {
            return (
              discussion.category.toLowerCase() === category.text.toLowerCase()
            );
          });
          return (
            <div className="py-3" key={index}>
              <DiscussionCard
                forum_id={id}
                discussion={discussion}
                categoryColor={categoryColor}
              />
            </div>
          );
        })}
    </div>
  );
}

export default Discussion;
