import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import CreateForum from "./components/on-boarding/create-forum/createForum";
import Welcome from "./components/on-boarding/welcome/welcome";
import Forum from "./components/forum/forum";
import AddDiscussion from "./components/forum/discussion/add-discussion/addDiscussion";
import DiscussionInfo from "./components/forum/discussion/discussion-info/discussionInfo";
import ProtectedRoutes from "./protectedRoutes";
import Login from "./components/auth/login/login";
import SignUp from "./components/auth/sign-up/signUp";

class MurfRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path={"/"}
            exact
            component={() => <Redirect to={"/login"} />}
          />
          <Route path={"/login"} component={Login} />
          <Route path={"/sign-up"} component={SignUp} />
          <ProtectedRoutes path={"/create-forum"} component={CreateForum} />
          <ProtectedRoutes path={"/welcome"} component={Welcome} />
          <ProtectedRoutes
            path={"/forum/:id/add-discussion"}
            component={AddDiscussion}
          />
          <ProtectedRoutes
            path={"/forum/:id/discussion/:id"}
            component={DiscussionInfo}
          />
          <ProtectedRoutes path={"/forum/:id"} component={Forum} />
        </Switch>
      </Router>
    );
  }
}

export default MurfRouter;
