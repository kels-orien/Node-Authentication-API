import React, { Component } from "react";
import formstyle from "../../components/Form";
import { SubmitButton, LinkButton } from "../../components/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import red from "@material-ui/core/colors/red";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const API_URL = "http://localhost:8001/signupUser/";

const INITIAL_STATE = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  retypePassword: "",
  errorMessage: false,
  passwordMatch: null,
  message: ""
};

class SignUp extends Component {
  state = { ...INITIAL_STATE };
  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  signupUser = async event => {
    event.preventDefault();

    let response = await axios.post(API_URL, {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    });
    if (response.data === "Username already taken") {
      this.setState({ ...INITIAL_STATE });
      this.setState({
        errorMessage: true
      });
    } else {
      this.setState({
        message: response.data.message,
        errorMessage: false
      });
    }
  };

  confirmPW() {
    const { password, retypePassword } = this.state;
    const isMatch = password !== retypePassword && password.length <= 7;
    this.setState({
      passwordMatch: isMatch
    });
  }
  validateForm() {
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      retypePassword
    } = this.state;

    const isInvalid =
      !firstname ||
      !lastname ||
      !email ||
      !username ||
      !password ||
      password !== retypePassword ||
      password.length <= 7;
    return isInvalid;
  }
  render() {
    const { classes } = this.props;
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      retypePassword,
      passwordMatch,
      errorMessage,
      message
    } = this.state;

    if (message === "") {
      return (
        <div className={classes.root}>
          <form noValidate autoComplete="off" onSubmit={this.signupUser}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary">
                  SIGN UP
                </Typography>
                <TextField
                  name="firstname"
                  label="FirstName"
                  value={firstname}
                  fullWidth
                  onChange={this.onChange}
                  margin="normal"
                />
                <br />
                <TextField
                  name="lastname"
                  label="LastName"
                  value={lastname}
                  fullWidth
                  onChange={this.onChange}
                  margin="normal"
                />
                <br />
                <TextField
                  name="email"
                  label="Email"
                  value={email}
                  fullWidth
                  onChange={this.onChange}
                  margin="normal"
                />
                <br />
                <TextField
                  name="username"
                  label="Username"
                  value={username}
                  fullWidth
                  onChange={this.onChange}
                  margin="normal"
                />
                <br />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={this.onChange}
                  margin="normal"
                />
                <br />
                <TextField
                  name="retypePassword"
                  label=" Retype Password"
                  type="password"
                  fullWidth
                  value={retypePassword}
                  onChange={this.onChange}
                  onBlur={this.confirmPW.bind(this)}
                  margin="normal"
                />
                {passwordMatch && (
                  <div>
                    <p className={red}>
                      Please check that your passwords match and are at least 8
                      characters.
                    </p>
                  </div>
                )}
                {errorMessage && (
                  <div>
                    <p className={red}>Username is unavailable</p>
                  </div>
                )}
                <div>
                  <p>Password must be a minium of 8 characters in length.</p>
                </div>
                <CardActions className={classes.cardAction}>
                  <SubmitButton
                    buttonText={`Submit`}
                    disabled={this.validateForm()}
                  />
                </CardActions>
              </CardContent>
              <CardActions className={classes.cardAction}>
                <LinkButton buttonText={`Sign In`} link={`/signin`} />
              </CardActions>
            </Card>
          </form>
        </div>
      );
    } else if (message === "user created") {
      return (
        <div>
          <Card>
            <Typography>User Registration Successfull!</Typography>
            <LinkButton buttonText={`Sign In`} link={`/signin`} />
          </Card>
        </div>
      );
    }
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(formstyle)(SignUp);
