import React, { Component } from "react";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
class EditProfile extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <NavBar />
        <h1>Edit Profile Component</h1>
      </div>
    );
  }
}

export default EditProfile;
