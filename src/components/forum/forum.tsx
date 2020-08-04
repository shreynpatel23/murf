import React from "react";
import Styles from "./forum.module.scss";
import TopNav from "../../shared/top-nav/topNav";
import SideBar from "../../shared/side-bar/sideBar";
import { useLocation, Switch, Route, Redirect } from "react-router-dom";
import Discussion from "./discussion/discussion";
import Home from "./home/home";
import Members from "./members/members";
import Settings from "./settings/settings";
import Saved from "./saved/saved";
import CategoryContextProvider from "../../context/categoryContext";

function Forum() {
  let location = useLocation();
  return (
    <div className={Styles.background}>
      <TopNav />
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
                  path={"/forum"}
                  exact
                  component={() => <Redirect to="/forum/home" />}
                />
                <Route path={"/forum/home"} exact component={Home} />
                <Route
                  path={"/forum/discussion"}
                  exact
                  component={Discussion}
                />
                <Route path={"/forum/members"} exact component={Members} />
                <Route path={"/forum/settings"} exact component={Settings} />
                <Route path={"/forum/saved"} exact component={Saved} />
              </Switch>
            </div>
          </CategoryContextProvider>
        </div>
      </div>
    </div>
  );
}

export default Forum;
