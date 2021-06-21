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
import PageNotFound from "./shared/page-not-found/pageNotFound";
import EmailNotVerified from "./components/auth/email-not-verified/emailNotVerified";
import ThemeState from "./themeState";

class MurfRouter extends React.Component {
  render() {
    return (
      <Router>
        <ThemeState>
          <Switch>
            <Route
              path={"/"}
              exact
              component={() => <Redirect to={"/login"} />}
            />
            <Route path={"/login"} component={Login} />
            <Route path={"/sign-up"} component={SignUp} />
            <ProtectedRoutes path={"/email-not-verified"}>
              <EmailNotVerified />
            </ProtectedRoutes>
            <ProtectedRoutes path={"/create-forum"}>
              <CreateForum />
            </ProtectedRoutes>
            <ProtectedRoutes path={"/welcome"}>
              <Welcome />
            </ProtectedRoutes>
            <ProtectedRoutes path={"/forum/:id/add-discussion"}>
              <AddDiscussion />
            </ProtectedRoutes>
            <ProtectedRoutes path={"/forum/:id/discussion/:id"}>
              <DiscussionInfo />
            </ProtectedRoutes>
            <ProtectedRoutes path={"/forum/:id"}>
              <Forum />
            </ProtectedRoutes>
            <Route path="/page-not-found" component={PageNotFound} />
            <Route
              path=""
              component={() => <Redirect to="/page-not-found" />}
            />
          </Switch>
        </ThemeState>
      </Router>
    );
  }
}

export default MurfRouter;
