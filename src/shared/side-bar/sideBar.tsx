import React, { useEffect, useState } from "react";
import Styles from "./sideBar.module.scss";
import { sideBarItems, POSTS } from "../../constants/sideBar";
import { useLocation, useHistory, useParams } from "react-router-dom";

function SideBar({ forum_channels, currentSelectedChannel }) {
  let location = useLocation();
  let history = useHistory();
  const { id }: any = useParams();

  const strArr = location.pathname.split("/");
  // eslint-disable-next-line
  const [channels, setChannels] = useState(forum_channels);
  const [currentActiveChannel, setCurrentActiveChannel] = React.useState("");

  useEffect(() => {
    setCurrentActiveChannel(channels[0]?.channel_name);
    currentSelectedChannel(channels[0]);
    // eslint-disable-next-line
  }, [channels]);

  // use this function to change the navigation.
  function navigateTo(value) {
    history.push(`/forum/${id}/${value.toLowerCase()}`);
  }
  return (
    <div className="py-2 px-4 sticky-top" style={{ top: "80px", zIndex: 2 }}>
      {sideBarItems.map((sideBarItem) => {
        return (
          <div key={sideBarItem}>
            <div
              className={`my-2 ${
                strArr.includes(sideBarItem.toLowerCase())
                  ? Styles.activeTab
                  : Styles.nonActiveTab
              }`}
              onClick={() => navigateTo(sideBarItem)}
            >
              <p
                className={`mb-0 ${
                  strArr.includes(sideBarItem.toLowerCase())
                    ? Styles.activeTabText
                    : Styles.nonActiveTabText
                }`}
              >
                {sideBarItem}
              </p>
            </div>
          </div>
        );
      })}
      {location.pathname.includes(POSTS.toLowerCase()) ? (
        <div>
          <hr className="m-0" />
          <div className="py-3 d-flex align-items-center">
            <div className="pr-2">
              <p className={`mb-0 ${Styles.trendingTopics}`}>Channels</p>
            </div>
          </div>

          {channels.map((channel) => {
            return (
              <div
                className={
                  channel.channel_name === currentActiveChannel
                    ? Styles.activeTab
                    : Styles.nonActiveTab
                }
                style={{ padding: "10px 25px" }}
                key={channel._id}
                onClick={() => {
                  setCurrentActiveChannel(channel.channel_name);
                  currentSelectedChannel(channel);
                  history.push(`/forum/${id}/posts`);
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="px-2">
                    <p
                      className={`mb-0 ${
                        channel.channel_name === currentActiveChannel
                          ? Styles.activeTabText
                          : Styles.nonActiveTabText
                      }`}
                    >
                      {channel.channel_name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default SideBar;
