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
import getForumById from "../../api/getForumById";

function Forum() {
  let location = useLocation();
  const { id }: any = useParams();
  const [forum, setForum] = React.useState({
    forumName: "",
    user: {},
  });
  useEffect(() => {
    getForumById(id)
      .then((response: any) => {
        const { forumName, userId } = response.data;
        setForum((forum) => ({
          ...forum,
          forumName: forumName,
          user: userId,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div className={Styles.background}>
      <TopNav data={forum} />
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
                  exact
                  component={Discussion}
                />
                <Route
                  path={`/forum/${id}/members`}
                  exact
                  component={Members}
                />
                <Route
                  path={`/forum/${id}/settings`}
                  exact
                  component={Settings}
                />
              </Switch>
            </div>
          </CategoryContextProvider>
        </div>
      </div>
    </div>
  );
}

export default Forum;
