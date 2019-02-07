import React, { Component } from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import * as Cookies from "es-cookie";
import { Redirect } from "react-router-dom";

const INITIAL_STATE = {
  username: "",
  accessToken: ""
};

class Home extends Component {
  state = { ...INITIAL_STATE };

  async componentWillMount() {
    let token = Cookies.get("token");
    this.setState({
      accessToken: token
    });
  }
  render() {
    const { accessToken } = this.state;

    if (accessToken === "" || accessToken === undefined) {
      return <Redirect to={`/signin`} />;
    }
    return (
      <div>
        <TopBar />
        <NavBar />
        <h1>Welcome!</h1>
      </div>
    );
  }
}

export default Home;
