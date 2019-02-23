import React, { Component } from "react";
import axios from "axios";
import { SubmitButton, LinkButton } from "../../components/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import formStyle from "../../components/Form";

const API_URL = "http://localhost:8001/forgotpassword/";

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
  validateEmail() {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const isValid = regex.test(this.state.email) ? true : false;
    if (isValid) {
      return false;
    } else {
      return true;
    }
  }
  clearState() {
    this.setState({ ...INITIAL_STATE });
  }
  sendEmail = async event => {
    event.preventDefault();

    let response = await axios.post(API_URL, {
      email: this.state.email
    });

    console.log("response", response.data);
    if (response.data === "email not in db") {
      this.setState({
        serverMessage: "",
        errorMessage: true
      });
    } else if (response.data === "recovery email sent") {
      this.clearState();
      this.setState({
        serverMessage: "recovery email sent",
        errorMessage: false
      });
    }
  };
  render() {
    const { classes } = this.props;
    const { email, serverMessage, errorMessage } = this.state;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <form autoComplete="off" onSubmit={this.sendEmail}>
            <CardContent>
              <TextField
                name="email"
                label="Email"
                value={email}
                fullWidth
                onChange={this.onChange}
                margin="normal"
              />
              <CardActions className={classes.cardAction}>
                <SubmitButton
                  buttonText={`Reset Password`}
                  disabled={this.validateEmail()}
                />
              </CardActions>
            </CardContent>
          </form>

          {errorMessage && (
            <div>
              <Typography>
                The email address is not available. Please retry or create an
                account
              </Typography>
            </div>
          )}

          {serverMessage === "recovery email sent" && (
            <div>
              <Typography>
                Password reset email sent, check your Inbox!
              </Typography>

              <LinkButton buttonText={`Go Home`} link={"/"} />
            </div>
          )}
        </Card>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(formStyle)(ForgotPassword);
