import React, { Component } from "react";
import axios from "axios";
import { SubmitButton, LinkButton } from "../../components/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import formstyle from "../../components/Form";

const API_URL_RESET = "http://localhost:8001/password-reset/";
const API_URL_UPDATE = "http://localhost:8001/updatepasswordViaEmail/";

const INITIAL_STATE = {
  username: "",
  password: "",
  confirmPassword: "",
  error: false,
  loading: false,
  updateSuccess: false
};

class ResetPassword extends Component {
  state = { ...INITIAL_STATE };

  async componentDidMount() {
    let response = await axios.get(API_URL_RESET, {
      params: { resetPasswordToken: this.props.match.params.token }
    });

    if (response.data.message === "password reset link is valid") {
      this.setState({
        username: response.data.username,
        updateSuccess: false,
        error: false,
        loading: false
      });
      console.log("username: ", this.state.username);
    } else {
      this.setState({
        updateSuccess: false,
        error: true,
        loading: false
      });
    }
  }
  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  updatePassword = async event => {
    event.preventDefault();
    let response = await axios.put(API_URL_UPDATE, {
      username: this.state.username,
      password: this.state.password
    });
    let data = response.data;
    console.log("response: ", response);

    if (data.message === "password updated successfully") {
      this.setState({
        updateSuccess: true,
        error: false
      });
    }
  };
  render() {
    const { classes } = this.props;
    const { password, error, loading, updateSuccess } = this.state;
    const disabled = this.state.password === "";
    if (error) {
      return (
        <div>
          <Typography>Password reset failure. Please Try again</Typography>
        </div>
      );
    } else if (loading) {
      return (
        <div>
          <Typography>Loading......</Typography>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <form autoComplete="off" onSubmit={this.updatePassword}>
            <Card className={classes.card}>
              <CardContent>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  fullWidth
                  onChange={this.onChange}
                  margin="normal"
                />
                <CardActions className={classes.cardAction}>
                  <SubmitButton
                    buttonText={"Update Password"}
                    disabled={disabled}
                  />
                </CardActions>
              </CardContent>
            </Card>
          </form>

          {updateSuccess && (
            <div>
              <Typography>
                Your password has been successfully reset, Please sign in
              </Typography>
              <LinkButton buttonText={"Sign In"} link={`/signin`} />
            </div>
          )}

          <LinkButton buttonText={"Home"} link={`/`} />
        </div>
      );
    }
  }
}
ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(formstyle)(ResetPassword);
