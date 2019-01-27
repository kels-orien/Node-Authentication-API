import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import SignUp from "./containers/SignUp";
import SignIn from "./containers/SignIn";
import EditProfile from "./containers/EditProfile";
import ForgotPassword from "./containers/ForgotPassword";
import ResetPassword from "./containers/ResetPassword";

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            path="/password-reset/:token"
            component={ResetPassword}
          />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/editProfile/:username" component={EditProfile} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
