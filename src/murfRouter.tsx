import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "./components/auth/auth";

class MurfdRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path={"/"}
            exact
            component={() => <Redirect to={"/auth"} />}
          />
          <Route path={"/auth"} component={Auth} />
        </Switch>
      </Router>
    );
  }
}

export default MurfdRouter;
