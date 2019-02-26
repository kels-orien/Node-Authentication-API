import React, { Component } from "react";
import * as Cookies from "es-cookie";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

export class SignOut extends Component {
  state = {
    signOut: null
  };
  componentWillMount() {
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
    return <Typography>SignOut Component</Typography>;
  }
}

export default SignOut;
