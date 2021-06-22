import React, { useState, useEffect } from "react";
import Styles from "./posts.module.scss";
import PostCard from "./post-card/postCard";
import Button from "../../../shared/button/button";
import { useHistory, useParams } from "react-router-dom";
import { buttonSize } from "../../../constants/button-size";
import { buttonTypes } from "../../../shared/buttonTypes";
import { callGetApi } from "../../../api/axios";
import PostEmptyState from "./post-empty-state/postEmptyState";

export default function Posts({ currentSelectedChannel }) {
  const { id }: any = useParams();
  let history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //     setPosts(response.data.sort(compare));
    async function getAllPostOfChannel() {
      setLoading(true);
      try {
        const { data }: any = await callGetApi(
          `/channels/${currentSelectedChannel._id}/posts`
        );
        setLoading(false);
        setPosts(data);
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    }

    getAllPostOfChannel();
  }, [currentSelectedChannel]);
  // function compare(a) {
  //   //  we are using this variable to enter number so that we can sort based upon the number
  //   let comparison = 0;
  //   if (a.pinned) {
  //     comparison = -1;
  //   } else {
  //     comparison = 1;
  //   }
  //   return comparison;
  // }
  return (
    <div className="py-4">
      {loading ? (
        <div
          style={{ height: "calc(100vh - 72px)" }}
          className="d-flex align-items-center justify-content-center"
        >
          <p>Loading...</p>
        </div>
      ) : posts.length > 0 ? (
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
                    type={buttonTypes.PRIMARY}
                    size={buttonSize.MEDIUM}
                    onClick={() => {
                      history.push(`/forum/${id}/add-post`, {
                        headingRef: null,
                        bodyRef: null,
                        channel_id: currentSelectedChannel._id,
                      });
                    }}
                  >
                    New Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {posts.map((post: any, index) => {
            return (
              <div className="py-3" key={index}>
                <PostCard forum_id={id} post={post} />
              </div>
            );
          })}
        </div>
      ) : (
        <PostEmptyState channel={currentSelectedChannel} />
      )}
    </div>
  );
}
