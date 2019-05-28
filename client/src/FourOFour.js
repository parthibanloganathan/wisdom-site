import React, { Component } from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';

const styles = {
    container: {
        height: '100vh'
    },
    main: {
        textAlign: 'center',
        marginTop: 100
    },
    title: {
        marginBottom: 50
    }
}

class FourOFour extends Component {
    state = {
        goHome: false
    }

    render() {
        const { classes } = this.props;

        if (this.state.goHome) {
            return <Redirect to='/' />
        }

        return (
            <Container maxWidth="lg" className={classes.container}>
                <div className={classes.main}>
                    <Typography variant="h2" gutterBottom className={classes.title}>Hmmm... looks like you're lost</Typography>
                    <Button onClick={() => this.setState({ goHome: true })}>Go back home</Button>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(FourOFour);
