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
import Dropdown from "../../../shared/dropdown/dropdown";
import PinSvg from "../../../shared/svg/pin";
import SaveSvg from "../../../shared/svg/save";
import AllFilterSvg from "../../../shared/svg/allFilter";

export default function Posts({ currentSelectedChannel }) {
  const postFilterDropdownLinks = {
    ALL: "All",
    PINNED: "Pinned",
    SAVED: "Saved",
  };
  const postFilterOptions = [
    {
      img: <AllFilterSvg width="16" classes={Styles.svg} />,
      value: postFilterDropdownLinks.ALL,
    },
    {
      img: <PinSvg classes={Styles.svg} />,
      value: postFilterDropdownLinks.PINNED,
    },
    {
      img: <SaveSvg classes={Styles.svg} />,
      value: postFilterDropdownLinks.SAVED,
    },
  ];
  const { id }: any = useParams();
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDropdownFilter, setSelectedDropdownFilter] = React.useState(
    postFilterDropdownLinks.ALL
  );
  useEffect(() => {
    async function getAllPostOfChannel() {
      if (!currentSelectedChannel) return;
      setLoading(true);
      try {
        const { data }: any = await callGetApi(
          `/channels/${currentSelectedChannel._id}/posts`
        );
        setLoading(false);
        setPosts(data);
        setAllPosts(data);
        setSelectedDropdownFilter(postFilterDropdownLinks.ALL);
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    }

    getAllPostOfChannel();
    // eslint-disable-next-line
  }, [currentSelectedChannel]);
  return (
    <div className="py-4">
      {loading ? (
        <div
          style={{ height: "calc(100vh - 72px)" }}
          className="d-flex align-items-center justify-content-center"
        >
          <p>Loading...</p>
        </div>
      ) : allPosts.length > 0 ? (
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
                <Dropdown
                  header={
                    <p
                      className={`mb-0 ${Styles.label}`}
                      style={{ cursor: "pointer" }}
                    >
                      Filter Based on{" "}
                      <span className={Styles.value}>
                        {selectedDropdownFilter}
                      </span>{" "}
                      <span>
                        <ArrowDown color={Colors.secondaryColor} />
                      </span>
                    </p>
                  }
                  body_classes="dropdown-menu-right"
                  click={(value) => {
                    if (value === postFilterDropdownLinks.ALL) {
                      setSelectedDropdownFilter(postFilterDropdownLinks.ALL);
                      return setPosts(allPosts);
                    }
                    if (value === postFilterDropdownLinks.PINNED) {
                      setSelectedDropdownFilter(postFilterDropdownLinks.PINNED);
                      return setPosts(() =>
                        allPosts.filter((post) => post.pinned)
                      );
                    }
                    if (value === postFilterDropdownLinks.SAVED) {
                      setSelectedDropdownFilter(postFilterDropdownLinks.SAVED);
                      return setPosts(() =>
                        allPosts.filter((post) => post.saved)
                      );
                    }
                  }}
                  options={postFilterOptions}
                />
              </div>
            </div>
            {posts.length > 0 ? (
              posts.map((post: any, index) => {
                return (
                  <div className="py-3" key={index}>
                    <PostCard
                      forum_id={id}
                      post={post}
                      pinAPost={(value: any) => {
                        const updatedPosts = allPosts.map((post) => {
                          if (post._id === value._id)
                            return { ...post, pinned: value.pinned };
                          return post;
                        });
                        setPosts(updatedPosts);
                        setAllPosts(updatedPosts);
                        setSelectedDropdownFilter(postFilterDropdownLinks.ALL);
                      }}
                      saveAPost={(value: any) => {
                        const updatedPosts = allPosts.map((post) => {
                          if (post._id === value._id)
                            return { ...post, saved: value.saved };
                          return post;
                        });
                        setPosts(updatedPosts);
                        setAllPosts(updatedPosts);
                        setSelectedDropdownFilter(postFilterDropdownLinks.ALL);
                      }}
                      setLoading={(value: boolean) => setLoading(value)}
                    />
                  </div>
                );
              })
            ) : (
              <div className={`py-3 ${Styles.post_empty_state}`}>
                <p className="mb-0">No post {selectedDropdownFilter} yet </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <PostEmptyState channel={currentSelectedChannel} />
      )}
    </div>
  );
}
