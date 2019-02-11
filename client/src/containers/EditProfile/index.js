import React, { Component } from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import axios from "axios";
import { SubmitButton, LinkButton } from "../../components/Button";
import formstyle from "../../components/Form";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import * as Cookies from "es-cookie";
import { Redirect } from "react-router-dom";

const API_URL = "http://localhost:8001/getUser/";
const API_URL_UPDATE = "http://localhost:8001/getUser/";

const INITIAL_STATE = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  error: false,
  loading: false,
  updateSuccess: false
};

class EditProfile extends Component {
  state = {
    ...INITIAL_STATE
  };

  async componentDidMount() {
    this.setState({ loading: true });

    let token = Cookies.get("token");
    if (token === null) {
      this.setState({
        loading: false,
        error: true
      });
    }

    let response = await axios.get(API_URL, {
      headers: { Authorization: `JWT ${token}` }
    });
    if (response.data.message === "user found") {
      this.setState({
        loading: false,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        email: response.data.email,
        username: response.data.username,
        password: response.data.password,
        error: false
      });
    }
  }
  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  updateUser = async event => {
    event.preventDefault();

    let token = Cookies.get("token");
    if (token === null) {
      this.setState({
        loading: false,
        error: true
      });
    }

    let response = await axios.put(
      API_URL_UPDATE,
      {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        username: this.state.username
      },
      {
        headers: { Authorization: `JWT ${token}` }
      }
    );

    if (response.date.message === "user updated") {
      this.setState({
        updateSuccess: true,
        error: false
      });
    }
  };
  render() {
    const { classes } = this.props;
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      updateSuccess,
      error,
      loading
    } = this.state;

    if (error) {
      return (
        <div>
          <Typography>
            Difficulty in accessing your data.Please signin again!
          </Typography>
          <LinkButton buttonText={`Sign in`} link="/signin" />
        </div>
      );
    } else if (loading !== false) {
      return (
        <div>
          <Typography>Loading.....</Typography>
        </div>
      );
    } else if (loading === false && updateSuccess === true) {
      return <Redirect to={`/${username}`} />;
    } else if (loading === false) {
      return (
        <div>
          <TopBar />
          <NavBar />
          <div className={classes.root}>
            <Card className={classes.card}>
              <CardContent>
                <form autoComplete="off" onSubmit={this.updateUser}>
                  <TextField
                    name="firstname"
                    label="FirstName"
                    value={firstname}
                    fullWidth
                    onChange={this.onChange}
                    margin="normal"
                  />
                  <TextField
                    name="lastname"
                    label="LastName"
                    value={lastname}
                    fullWidth
                    onChange={this.onChange}
                    margin="normal"
                  />
                  <TextField
                    name="email"
                    label="Email"
                    value={email}
                    fullWidth
                    onChange={this.onChange}
                    margin="normal"
                  />
                  <TextField
                    name="username"
                    label="Username"
                    value={username}
                    fullWidth
                    onChange={this.onChange}
                    margin="normal"
                  />

                  <TextField
                    name="password"
                    label="Password"
                    value={password}
                    fullWidth
                    onChange={this.onChange}
                    margin="normal"
                  />

                  <SubmitButton buttonText={`Save Changes`} />
                </form>
                <LinkButton buttonText={`Home`} link={`/`} />
                <LinkButton buttonText={`Undo Changes`} link={`/`} />
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(formstyle)(EditProfile);
