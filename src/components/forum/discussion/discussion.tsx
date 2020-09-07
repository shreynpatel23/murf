import React, { useContext, useState, useEffect } from "react";
import Styles from "./discussion.module.scss";
import { CategoryContext } from "../../../context/categoryContext";
import getAllPosts from "../../../api/getAllPosts";
import DiscussionCard from "./discussion-card/discussionCard";
import Button from "../../../shared/button/button";
import { primaryButtonStyle } from "../../../shared/buttonStyles";
import { categoryArray } from "../../../constants/categary";
import { useHistory } from "react-router-dom";

function Discussion() {
  let history = useHistory();
  const [discussions, setDiscussions] = useState([]);
  let categoryColor = {};
  useEffect(() => {
    getAllPosts()
      .then((response: any) => {
        setDiscussions(response.data.sort(compare));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
                  style={primaryButtonStyle}
                  onClick={() => {
                    history.push("/forum/add-discussion");
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
