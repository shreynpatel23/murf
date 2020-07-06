import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "./components/auth/auth";
import CreateForum from "./components/on-boarding/create-forum/createForum";
import ForumSetup from "./components/on-boarding/forum-setup/forumSetup";
import Welcome from "./components/on-boarding/welcome/welcome";

class MurfdRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={"/"} exact component={() => <Redirect to={"/auth"} />} />
          <Route path={"/auth"} component={Auth} />
          <Route path={"/create-forum"} component={CreateForum} />
          <Route path={"/setup-forum"} component={ForumSetup} />
          <Route path={"/welcome"} component={Welcome} />
        </Switch>
      </Router>
    );
  }
}

export default MurfdRouter;
