import React, { Component } from "react";
import formstyle from "../../components/Form";
import { SubmitButton, LinkButton } from "../../components/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
class SignIn extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                <h1>SIGN IN</h1>
              </Typography>
              <TextField
                id="username"
                label="Username"
                value=""
                fullWidth
                onChange=""
                margin="normal"
              />
              <br />
              <TextField
                id="password"
                label="Password"
                type="password"
                value=""
                fullWidth
                onChange=""
                margin="normal"
              />

              <CardActions className={classes.cardAction}>
                <SubmitButton buttonText={`Sign In`} link={`/`} />
              </CardActions>

              <CardActions className={classes.cardAction}>
                <LinkButton
                  buttonText={`Forgot Passord`}
                  link={`/forgotpassword`}
                />
              </CardActions>
              <CardActions className={classes.cardAction}>
                <LinkButton buttonText={`Sign Up`} link={`/signup`} />
              </CardActions>
            </CardContent>
          </Card>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(formstyle)(SignIn);
