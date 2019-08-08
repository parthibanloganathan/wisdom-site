import React, { Component } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Owl from "./assets/owl.svg";
import queryString from "query-string";

const styles = {
  container: {
    height: "100vh"
  },
  main: {
    textAlign: "center",
    marginTop: 100
  },
  owl: {
    marginBottom: 20,
    width: "8%"
  },
  title: {
    marginBottom: 50
  }
};

class BusinessInquiry extends Component {
  state = {
    goHome: false,
    message: null
  };

  componentWillMount() {
    const email = queryString.parse(this.props.location.search).email;

    axios
      .post("/wisdomapi/inquiry", { email: email })
      .then(response => {
        this.setState({
          message:
            "Thanks for your interest! We'll get back to you shortly at " +
            response.data.email
        });
      })
      .catch(error => {
        this.setState({
          message:
            "Something went wrong. We didn't receive your inquiry. You can also reach us at business@getwisdomapp.com"
        });
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;

    if (this.state.goHome) {
      return <Redirect to="/" />;
    }

    return (
      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.main}>
          <img src={Owl} alt="Owl" className={classes.owl} />
          <Typography variant="h4" gutterBottom className={classes.title}>
            {this.state.message}
          </Typography>
          <Button onClick={() => this.setState({ goHome: true })}>
            Go back home
          </Button>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(BusinessInquiry);
