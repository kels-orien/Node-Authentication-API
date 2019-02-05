import React, { Component } from "react";
import axios from "axios";
import { SubmitButton, LinkButton } from "../../components/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";

const INITIAL_STATE = {
  email: "",
  errorMessage: false,
  serverMessage: ""
};

class ForgotPassword extends Component {
  state = {
    ...INITIAL_STATE
  };
  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  sendEmail = async event => {
    event.preventDefault();

    let response = await axios.post(API_URL, {
      email: this.state.email
    });
    if (response.data === "email not in db") {
      this.setState({
        serverMessage: "",
        errorMessage: true
      });
    } else if (response.data === "recovery email sent") {
      this.setState({
        serverMessage: "recovery email sent",
        errorMessage: false
      });
    }
  };
  render() {
    const { email, serverMessage, errorMessage } = this.state;
    const disabled = this.state.email === "";
    return (
      <div>
        <form autoComplete="off" onSubmit={this.sendEmail}>
          <Card>
            <TextField
              name="email"
              label="Email"
              value={email}
              fullWidth
              onChange={this.onChange}
              margin="normal"
            />
            <SubmitButton buttonText={`Reset Password`} disabled={disabled} />
          </Card>
        </form>

        {errorMessage && (
          <div>
            <Typography>
              The email address is not available. Please retry or create an
              account
            </Typography>
          </div>
        )}

        {serverMessage === "recovery message sent" && (
          <div>
            <Typography>Password Reset Email Sent!</Typography>

            <LinkButton buttonText={`Go Home`} link={"/"} />
          </div>
        )}
      </div>
    );
  }
}

export default ForgotPassword;
