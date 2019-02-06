import React, { Component } from "react";
import axios from "axios";
import { SubmitButton, LinkButton } from "../../components/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";

const API_URL_RESET = "http://localhost:8001/password-reset/";
const API_URL_UPDATE = "http://localhost:8001/updatePasswordViaEmail/";

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
      params: { resetPasswordTaken: this.props.match.params.token }
    });

    if (response.data.message === "password reset link is valid") {
      this.setState({
        username: response.data.username,
        updateSuccess: false,
        error: false,
        loading: false
      });
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
    let response = axios.put(API_URL_UPDATE, {
      username: this.state.username,
      password: this.state.password
    });

    if (response.data.message === "password updated  successfully") {
      this.setState({
        updateSuccess: true,
        error: false
      });
    }
  };
  render() {
    const { password, error, loading, updateSuccess } = this.state;
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
        <div>
          <form autoComplete="off" onSubmit={this.updatePassword}>
            <TextField
              name="password"
              label="Password"
              type="password"
              value={password}
              fullWidth
              onChange={this.onChange}
              margin="normal"
            />
            <SubmitButton buttonText={"Update Password"} />
          </form>

          {updateSucess && (
            <div>
              <Typography>
                Your password has been successfully changed, you can now sign in
              </Typography>
              <LinkButton buttonText={"Sign In"} link={`signin`} />
            </div>
          )}

          <LinkButton buttonText={"Home"} link={`/`} />
        </div>
      );
    }
  }
}

export default ResetPassword;
