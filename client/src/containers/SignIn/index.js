import React, { Component } from "react";
import formStyle from "../../components/Form";
import Button from "@material-ui/core/Button";
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
const API_URL_GITHUB = "http://localhost:8001/authGithub";
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
  githubSignIn = async event => {
    event.preventDefault();
    let response = await axios.get(API_URL_GITHUB);
    console.log(response);
  };
  signinUser = async event => {
    event.preventDefault();
    let response = await axios.post(API_URL, {
      username: this.state.username,
      password: this.state.password
    });

    if (
      response.data === "Wrong username/password details" ||
      response.data === "login details are incorrect"
    ) {
      this.setState({
        errorMessage: true
      });
    } else {
      Cookies.set("token", response.data.token, { expires: 1 });
      this.clearState();
      this.setState({
        signedIn: true,
        errorMessage: false
      });
    }
  };
  clearState() {
    this.setState({ ...INITIAL_STATE });
  }
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
              <Typography className={classes.title} color="primary">
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
                <Typography color="secondary">
                  username and password combination is incorrect. Please try
                  again.
                </Typography>
              </div>
            )}
            <CardActions className={classes.cardAction}>
              <Button onClick={this.githubSignIn}>Sign In with Github</Button>
            </CardActions>

            <CardActions className={classes.cardAction}>
              <LinkButton
                buttonText={`Forgot Password`}
                link={`/forgotPassword`}
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

export default withStyles(formStyle)(SignIn);
