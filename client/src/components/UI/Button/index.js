import React from "react";
import Button from "@material-ui/core/Button";

const Button = props => (
  <div>
    <Button
      label="Submit"
      disabled={props.disabled}
      onClick={props.clicked}
      primary={true}
      style={props.style}
    />
  </div>
);

export default Button;
