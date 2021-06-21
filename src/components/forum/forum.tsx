import React, { useEffect } from "react";
import Styles from "./forum.module.scss";
import TopNav from "../../shared/top-nav/topNav";
import SideBar from "../../shared/side-bar/sideBar";
import {
  useLocation,
  Switch,
  Route,
  Redirect,
  useParams,
} from "react-router-dom";
import Discussion from "./discussion/discussion";
import Members from "./members/members";
import Settings from "./settings/settings";
import CategoryContextProvider from "../../context/categoryContext";
import { callGetApi } from "../../api/axios";
import { generateTheme } from "../../shared/colors";
import { hexToRgb } from "../../utils/hexToRgb";

function Forum() {
  let location = useLocation();
  const { id }: any = useParams();
  const [forum, setForum] = React.useState<any>();
  useEffect(() => {
    async function getForumDetails() {
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
      } catch (err) {
        console.log(err);
      }
    }
    getForumDetails();
  }, [id]);
  return (
    <div className={Styles.background}>
      <TopNav forum_name={forum?.forum_name} user={forum?.userId} />
      <div className="container-fluid">
        <div className="row px-3">
          <CategoryContextProvider>
            <div className="col-xl-3 d-none d-xl-block">
              <SideBar />
            </div>
            <div
              className="col-xl-9 col-lg-12"
              style={{ minHeight: "calc(100vh - 100px)", height: "100%" }}
            >
              <Switch location={location}>
                <Route
                  path={`/forum/${id}`}
                  exact
                  component={() => <Redirect to={`/forum/${id}/discussion`} />}
                />
                <Route
                  path={`/forum/${id}/discussion`}
                  component={Discussion}
                />
                <Route path={`/forum/${id}/members`} component={Members} />
                <Route path={`/forum/${id}/settings`} component={Settings} />
              </Switch>
            </div>
          </CategoryContextProvider>
        </div>
      </div>
    </div>
  );
}

export default Forum;
