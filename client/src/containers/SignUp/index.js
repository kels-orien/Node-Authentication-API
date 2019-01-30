import React, { Component } from "react";
import formstyle from "../../components/Form";
import { SubmitButton } from "../../components/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

class SignUp extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                <h1>SIGN UP</h1>
              </Typography>
              <TextField
                id="firstname"
                label="FirstName"
                value=""
                fullWidth
                onChange=""
                margin="normal"
              />
              <br />
              <TextField
                id="lastname"
                label="LastName"
                value=""
                fullWidth
                onChange=""
                margin="normal"
              />
              <br />
              <TextField
                id="email"
                label="email"
                value=""
                fullWidth
                onChange=""
                margin="normal"
              />
              <br />
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
                fullWidth
                value=""
                onChange=""
                margin="normal"
              />
              <br />
              <TextField
                id="retype-password"
                label=" Retype Password"
                type="password"
                fullWidth
                value=""
                onChange=""
                margin="normal"
              />
              <CardActions className={classes.cardAction}>
                <SubmitButton buttonText={`Submit`} link={`/`} />
              </CardActions>
            </CardContent>
          </Card>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(formstyle)(SignUp);
