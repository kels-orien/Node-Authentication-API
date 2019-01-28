import React, { Component } from "react";
import { LinkButton, signinButton } from "../../components/Button";
class SignIn extends Component {
  render() {
    return (
      <div>
        <h1>SignIn Component</h1>

        <LinkButton
          buttonText={`Sign In`}
          buttonStyle={signinButton}
          link={`/`}
        />
      </div>
    );
  }
}

export default SignIn;
