import React, { Component } from "react";
import { LinkButton, signinButton } from "../../components/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import Typography from "@material-ui/core/Typography";
const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10rem"
  },
  card: {
    minWidth: 275,
    maxWidth: 600
  },
  cardAction: {
    display: "inherit"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

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
                label="username"
                value=""
                onChange=""
                margin="normal"
              />
              <br />
              <TextField
                id="password"
                label="password"
                type="password"
                value=""
                onChange=""
                margin="normal"
              />
              <CardActions className={classes.cardAction}>
                <LinkButton buttonText={`Sign In`} link={`/`} />
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

export default withStyles(styles)(SignIn);
