import React, { Component } from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
class Home extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <NavBar />
        <h1>Home Component</h1>
      </div>
    );
  }
}

export default Home;
