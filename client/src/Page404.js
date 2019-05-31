import React, { Component } from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';
import Owl from './assets/owl.svg';
import axios from 'axios';

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

class Page404 extends Component {
    state = {
        goHome: false
    }

    test = () => {
        axios.post('/api/joinwaitlist', {
            'email': 'parthi147@gmaile.com',
            'referralSource': '23fg5m'
        }).then(response => {
            var url = window.location.protocol + '//' + window.location.host;
            console.log(url);
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
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
                    <Typography variant="h2" gutterBottom className={classes.title}>Hmmm... looks like you're lost</Typography>
                    <Button onClick={() => this.setState({ goHome: true })}>Go back home</Button>
                    <Button onClick={this.test}>Test</Button>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(Page404);
