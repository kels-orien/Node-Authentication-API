import React, { Component } from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import axios from "axios";
import { SubmitButton, LinkButton } from "../../components/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import * as Cookies from "es-cookie";

const API_URL = "http://localhost:8001/getUser/";

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
      params: {
        username: this.props.match.params.username
      },
      headers: { Authorization: `JWT ${token}` }
    });
    if (response.data.message === "") {
      this.state({
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
  render() {
    const { firstname, lastname, username, password, updateSuccess, error, loading}
   
    if (error) {
      return (
      <div>

        <LinkButton
         buttonText = {`Sign in`}
         link ="/signin"/>
        </div>)
    }else if (loadingUser !== false) {
      return (
        <div>
          <Typography>
            Loading.....
          </Typography>
          </div>
      )
    } else if (loading === false && updated === true) {
      return <Redirect to = {`/${username}`}/>
    } else if (loading === false) {
      return (
        <div>
          <form>
          <TextField
                name="firstname"
                label="firstname"
                value={firstname}
                fullWidth
                onChange={this.onChange}
                margin="normal"
              />
            <TextField
                name="lastname"
                label="lastname"
                value={lastname}
                fullWidth
                onChange={this.onChange}
                margin="normal"
              />
            <TextField
                name="email"
                label="email"
                value={email}
                fullWidth
                onChange={this.onChange}
                margin="normal"
              />
              <TextField
                name="username"
                label="username"
                value={username}
                fullWidth
                onChange={this.onChange}
                margin="normal"
              />

              <TextField
                name="password"
                label="password"
                value={password}
                fullWidth
                onChange={this.onChange}
                margin="normal"
              />  

              <SubmitButton
              buttonText = {`Save Changes`}
              />
          </form>

          <LinkButton
          buttonText = {`Home`}
          link = {`/`}/>
           <LinkButton
          buttonText = {`Undo Changes`}
          link = {`/`}/>
        </div>
      )
    }
    
  }
}

export default EditProfile;
