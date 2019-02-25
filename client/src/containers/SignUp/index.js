import React, { Component } from "react";
import formStyle from "../../components/Form";
import { SubmitButton, LinkButton } from "../../components/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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
  passwordMatch: false,
  confirmEmail: false,
  message: ""
};

class SignUp extends Component {
  state = { ...INITIAL_STATE };
  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  clearState() {
    this.setState({ ...INITIAL_STATE });
  }
  signupUser = async event => {
    event.preventDefault();

    let response = await axios.post(API_URL, {
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    });
    if (response.data === "Username already taken") {
      this.clearState();
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
  checkEmail() {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const isValid = regex.test(this.state.email) ? true : false;

    this.setState({
      confirmEmail: !isValid
    });
  }
  confirmPW() {
    const { password, retypePassword } = this.state;
    const isMatch = password !== retypePassword && password.length <= 7;
    this.setState({
      passwordMatch: isMatch
    });
  }
  validateEmail(email) {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const isValid = regex.test(email) ? true : false;

    return !isValid;
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
      password.length <= 7 ||
      this.validateEmail(email);
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
      confirmEmail,
      errorMessage,
      message
    } = this.state;

    if (message === "") {
      return (
        <div className={classes.root}>
          <form noValidate autoComplete="off" onSubmit={this.signupUser}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="primary">
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
                  onBlur={this.checkEmail.bind(this)}
                  margin="normal"
                />
                {confirmEmail && (
                  <div>
                    <Typography color="error">
                      Please enter a valid email address
                    </Typography>
                  </div>
                )}
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
                    <Typography color="error">
                      Please check that your passwords match and are at least 8
                      characters.
                    </Typography>
                  </div>
                )}
                {errorMessage && (
                  <div>
                    <Typography color="error">
                      Username is unavailable
                    </Typography>
                  </div>
                )}
                <div>
                  <Typography color="primary">
                    Password must be a minimum of 8 characters in length.
                  </Typography>
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
        <div className={classes.root}>
          <Card className={classes.card}>
            <Typography>User Registration Successful!</Typography>
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

export default withStyles(formStyle)(SignUp);
