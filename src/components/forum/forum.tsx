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

function Forum() {
  let location = useLocation();
  return (
    <div className={Styles.background}>
      <TopNav />
      <div className="container-fluid">
        <div className="row pt-4 ml-5">
          <div className="col-xl-3 d-none d-xl-block">
            <SideBar />
          </div>
          <div className="col-xl-7 col-lg-12">
            <Switch location={location}>
              <Route
                path={"/forum"}
                exact
                component={() => <Redirect to="/forum/home" />}
              />
              <Route path={"/forum/home"} exact component={Home} />
              <Route path={"/forum/discussion"} exact component={Discussion} />
              <Route path={"/forum/members"} exact component={Members} />
              <Route path={"/forum/settings"} exact component={Settings} />
              <Route path={"/forum/saved"} exact component={Saved} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forum;
