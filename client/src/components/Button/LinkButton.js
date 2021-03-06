import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  button: {
    marginTop: "2rem",
    textDecoration: "none",
    width: "100%"
  },
  input: {
    display: "none"
  }
});

const LinkButton = props => {
  const { classes } = props;
  return (
    <Fragment>
      <Button className={classes.button}>
        <Link to={props.link}>{props.buttonText}</Link>
      </Button>
    </Fragment>
  );
};

LinkButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LinkButton);
