import React, { useEffect } from "react";
import Styles from "./forum.module.scss";
import TopNav from "../../shared/top-nav/topNav";
import SideBar from "../../shared/side-bar/sideBar";
import { useLocation, Switch, Route, useParams } from "react-router-dom";
import Posts from "./posts/posts";
import Members from "./members/members";
import Settings from "./settings/settings";
import { callGetApi } from "../../api/axios";
import { generateTheme } from "../../shared/colors";
import { hexToRgb } from "../../utils/hexToRgb";
import ViewPost from "./posts/view-post/viewPost";
import AuthState from "../auth/auth-state/authState";

function Forum() {
  let location = useLocation();
  const { id }: any = useParams();
  const [forum, setForum] = React.useState<any>();
  const [loading, setLoading] = React.useState(true);
  const [currentActiveChannel, setCurrentActiveChannel] = React.useState();
  useEffect(() => {
    async function getForumDetails() {
      setLoading(true);
      try {
        const { data }: any = await callGetApi(`/forums/${id}`);
        localStorage.setItem("theme", data.theme);
        const existing_theme = generateTheme(data.theme);
        const rgb = hexToRgb(existing_theme.accentColor);
        document.documentElement.style.setProperty(
          "--accentColor",
          existing_theme.accentColor
        );
        document.documentElement.style.setProperty(
          "--accentBackGroundColor",
          `rgba(${rgb.r},${rgb.g},${rgb.b}, 0.15)`
        );
        setForum(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    getForumDetails();
  }, [id]);
  return (
    <div className={Styles.background}>
      <TopNav forum_name={forum?.forum_name} user={forum?.createdBy} />
      {loading ? (
        <div
          style={{ height: "calc(100vh - 72px)" }}
          className="d-flex align-items-center justify-content-center"
        >
          <p>Loading...</p>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row px-3">
            <div className="col-xl-3 d-none d-xl-block">
              <SideBar
                forum_channels={forum?.channels}
                currentSelectedChannel={(value) => {
                  setCurrentActiveChannel(value);
                }}
              />
            </div>
            <div
              className="col-xl-9 col-lg-12"
              style={{ minHeight: "calc(100vh - 72px)", height: "100%" }}
            >
              <Switch location={location}>
                <AuthState users={forum?.users}>
                  <Route
                    path={`/forum/:id/posts/:id`}
                    render={() => {
                      return <ViewPost />;
                    }}
                  />
                  <Route
                    path={`/forum/:id/posts`}
                    render={() => {
                      return (
                        <Posts currentSelectedChannel={currentActiveChannel} />
                      );
                    }}
                  />
                  <Route
                    path={`/forum/:id/members`}
                    render={() => {
                      return <Members />;
                    }}
                  />
                  <Route
                    path={`/forum/:id/settings`}
                    render={() => {
                      return <Settings />;
                    }}
                  />
                </AuthState>
              </Switch>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Forum;
