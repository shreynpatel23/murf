import React, { useState, useEffect } from "react";
import Styles from "./posts.module.scss";
import PostCard from "./post-card/postCard";
import { useParams } from "react-router-dom";
import { callGetApi } from "../../../api/axios";
import PostEmptyState from "./post-empty-state/postEmptyState";
import AddPostBanner from "./add-post-banner/addPostBanner";
import filterSvg from "../../../assets/images/filter.svg";
import ArrowDown from "../../../shared/svg/arrowDown";
import { Colors } from "../../../shared/colors";

export default function Posts({ currentSelectedChannel }) {
  const { id }: any = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
          <AddPostBanner
            forum_id={id}
            channel_id={currentSelectedChannel._id}
          />
          <div className={`mx-auto ${Styles.post_wrapper}`}>
            <div className="pt-3 pb-2 d-flex align-items-center justify-content-between">
              <p className={`mb-0 ${Styles.label}`}>
                Posts in{" "}
                <span className={Styles.value}>
                  {currentSelectedChannel?.channel_name}
                </span>
              </p>
              <div className="d-flex align-items-center">
                <div className="pr-2">
                  <img src={filterSvg} alt="filter" width="15" />
                </div>
                <p
                  className={`mb-0 ${Styles.label}`}
                  style={{ cursor: "pointer" }}
                >
                  Filter Based on <span className={Styles.value}>All</span>{" "}
                  <span>
                    <ArrowDown color={Colors.secondaryColor} />
                  </span>
                </p>
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
        </div>
      ) : (
        <PostEmptyState channel={currentSelectedChannel} />
      )}
    </div>
  );
}
