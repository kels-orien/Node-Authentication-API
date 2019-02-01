import React, { Component } from "react";
import formstyle from "../../components/Form";
import { SubmitButton, LinkButton } from "../../components/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as Cookies from "es-cookie";
import { Redirect } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8001/signinUser/";

const INITIAL_STATE = {
  username: "",
  password: "",
  errorMessage: false,
  signedIn: false
};

class SignIn extends Component {
  state = { ...INITIAL_STATE };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  signinUser = async event => {
    event.preventDefault();
    let response = await axios.post(API_URL, {
      username: this.state.username,
      password: this.state.password
    });
    let data = await response.data;

    if (data) {
      console.log("error: ", data);
    }

    if (
      data === "Wrong username/password details" ||
      data === "login details are incorrect"
    ) {
      this.setState({
        errorMessage: true
      });
    } else {
      Cookies.set("token", data.token);
      console.log("token: ", data.token);
      this.setState({ ...INITIAL_STATE });
      this.setState({
        signedIn: true,
        errorMessage: false
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { username, password, errorMessage, signedIn } = this.state;
    const disabled = username === "" || password === "";
    if (signedIn) {
      return <Redirect to={`/`} />;
    }
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <form autoComplete="off" onSubmit={this.signinUser}>
              <Typography className={classes.title} color="textSecondary">
                SIGN IN
              </Typography>
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
                value={password}
                fullWidth
                onChange={this.onChange}
                margin="normal"
              />

              <SubmitButton buttonText={`Sign In`} disabled={disabled} />
            </form>
            {errorMessage && (
              <div>
                <p>
                  username /password combination is incorrect. Please try again.
                </p>
              </div>
            )}
            <CardActions className={classes.cardAction}>
              <LinkButton
                buttonText={`Forgot Passord`}
                link={`/forgotpassword`}
              />
            </CardActions>
            <CardActions className={classes.cardAction}>
              <LinkButton buttonText={`Sign Up`} link={`/signup`} />
            </CardActions>
          </CardContent>
        </Card>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(formstyle)(SignIn);
