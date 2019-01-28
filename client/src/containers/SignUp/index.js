import React, { Component } from "react";
import { LinkButton, signupButton } from "../../components/Button";
class SignUp extends Component {
  render() {
    return (
      <div>
        <h1>SignUp Component</h1>

        <LinkButton
          buttonText={`Sign In`}
          buttonStyle={signupButton}
          link={`/`}
        />
      </div>
    );
  }
}

export default SignUp;
