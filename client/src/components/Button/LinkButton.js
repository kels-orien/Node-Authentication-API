import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const LinkButton = props => (
  <div>
    <Fragment>
      <Button variant="contained" color="primary" style={props.buttonStyle}>
        <Link style={props.linkStyle} to={props.link}>
          {props.buttonText}
        </Link>
      </Button>
    </Fragment>
  </div>
);

export default LinkButton;
