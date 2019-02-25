import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import * as Cookies from "es-cookie";
import { Redirect } from "react-router-dom";

class TopBarButton extends Component {
  state = {
    signOut: null
  };
  logOut() {
    let token = Cookies.get("token");
    if (token !== null) {
      Cookies.remove("token");
      console.log("token removed");
      this.setState({ signOut: true });
    }
  }
  render() {
    const { signOut } = this.state;
    if (signOut) {
      return <Redirect to={`/signin`} />;
    }
    return (
      <Fragment>
        <Button onClick={this.logOut()}>{this.props.buttonText}</Button>
      </Fragment>
    );
  }
}

export default withStyles(TopBarButton);
