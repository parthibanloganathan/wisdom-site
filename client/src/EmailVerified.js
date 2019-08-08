import React, { Component } from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Owl from './assets/owl.svg';

const styles = {
    container: {
        height: '100vh'
    },
    main: {
        textAlign: 'center',
        marginTop: 100
    },
    owl: {
        marginBottom: 20,
        width: '8%'
    },
    title: {
        marginBottom: 50
    }
}

class EmailVerified extends Component {
    state = {
        goHome: false,
        message: null
    }

    componentWillMount() {
        const path = window.location.pathname;

        axios.post('/wisdomapi' + path).then(response => {
            if (response.data.type === "already-verified") {
                this.setState({ message: "Your email, " + response.data.email + ", is already verified" });
            } else {
                this.setState({ message: "Your email, " + response.data.email + ", has been successfully verified" });
            }
            console.log(response);
        }).catch(error => {
            this.setState({ message: "Something went wrong. We couldn't verify your email" });
            console.log(error);
        });
    }

    render() {
        const { classes } = this.props;

        if (this.state.goHome) {
            return <Redirect to='/' />
        }

        return (
            <Container maxWidth="lg" className={classes.container}>
                <div className={classes.main}>
                    <img src={Owl} alt="Owl" className={classes.owl} />
                    <Typography variant="h4" gutterBottom className={classes.title}>{this.state.message}</Typography>
                    <Button onClick={() => this.setState({ goHome: true })}>Go back home</Button>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(EmailVerified);
