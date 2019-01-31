import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
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

const SubmitButton = props => {
  const { classes } = props;
  return (
    <Fragment>
      <Button
        variant="outlined"
        disabled={props.disabled}
        color="primary"
        type="submit"
        className={classes.button}
      >
        {props.buttonText}
      </Button>
    </Fragment>
  );
};

SubmitButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubmitButton);
