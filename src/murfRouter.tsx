import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "./components/auth/auth";
import CreateForum from "./components/on-boarding/create-forum/createForum";
import Welcome from "./components/on-boarding/welcome/welcome";
import Forum from "./components/forum/forum";
import AddDiscussion from "./components/forum/discussion/add-discussion/addDiscussion";
import DiscussionInfo from "./components/forum/discussion/discussion-info/discussionInfo";

class MurfRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={"/"} exact component={() => <Redirect to={"/auth"} />} />
          <Route path={"/auth"} component={Auth} />
          <Route path={"/create-forum"} component={CreateForum} />
          <Route path={"/welcome"} component={Welcome} />
          <Route path={"/forum/:id/add-discussion"} component={AddDiscussion} />
          <Route
            path={"/forum/:id/discussion/:id"}
            component={DiscussionInfo}
          />
          <Route path={"/forum/:id"} component={Forum} />
        </Switch>
      </Router>
    );
  }
}

export default MurfRouter;
