import React, { Component } from 'react';
import { Container, Grid, IconButton, TextField, Tooltip, Typography } from '@material-ui/core';
import FileCopy from '@material-ui/icons/FileCopy';
import axios from 'axios';
import queryString from 'query-string';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/styles';
import Notifications, { notify } from 'react-notify-toast';
import FourOFour from './FourOFour.js';

const styles = {
    container: {
        backgroundColor: '#1F2833',
        color: '#66FCF1',
        height: '100vh'
    },
    copied: {
        marginLeft: 190
    },
    copyButton: {
        marginTop: 20,
        marginLeft: 5,
        color: '#C5C6C7'
    },
    linkRow: {
        margin: 'auto',
        marginTop: 30
    },
    main: {
        margin: 'auto',
        width: '50%'
    },
    text: {
        color: '#C5C6C7'
    },
    title: {
        paddingTop: 50
    },
    cssLabel: {
        color: '#66FCF1'
    },
    cssOutlinedInput: {
        color: '#FFFFFF',
        '&$cssFocused $notchedOutline': {
            borderColor: `#66FCF1 !important`,
        }
    },
    cssFocused: {},
    notchedOutline: {
        borderWidth: '1px',
        borderColor: '#66FCF1 !important'
    },

}

class JoinedWaitlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            referralLink: '',
            referralSource: '',
            position: '',
            ready: false
        }
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        this.setState({ email: values.email });
        this.setState({ referralSource: values.ref });

        if (values.email === null) {
            return;
        }

        axios.post('/api/joinwaitlist', {
            'email': values.email,
            'referralSource': values.ref
        }).then(response => {
            var url = window.location.protocol + '//' + window.location.host;
            var constructedLink = url + '?ref=' + response.data.referralCode;
            this.setState({ referralLink: constructedLink, position: response.data.position, ready: true });
        }).catch(error => {
            console.log(error);
        });
    }

    onCopy = () => {
        notify.show('Copied link to clipboard', 'success', 3000);
    };

    render() {
        const { classes } = this.props;

        if (!this.state.ready) {
            return <FourOFour />
        }

        return (
            <Container maxWidth="lg" className={classes.container}>
                <div className={classes.main}>
                    <Notifications />
                    <Typography variant="h2" gutterBottom className={classes.title}>You're on the waitlist!</Typography>
                    <Typography className={classes.text}>There are {this.state.position - 1} people ahead of you in line</Typography>
                    <Typography className={classes.text}>Share the Wisdom app with friends to move up the waitlist! Here's your referral link:</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={9}>
                            <TextField
                                ref="ReferralLinkTextField"
                                label="Referral Link"
                                variant="outlined"
                                className={classes.textfield}
                                value={this.state.referralLink}
                                fullWidth
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused
                                    },
                                }}
                                InputProps={{
                                    readOnly: true,
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        notchedOutline: classes.notchedOutline
                                    },
                                }}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <CopyToClipboard onCopy={this.onCopy} text={this.state.referralLink}>
                                <Tooltip title="Copy link">
                                    <IconButton className={classes.copyButton}>
                                        <FileCopy />
                                    </IconButton>
                                </Tooltip>
                            </CopyToClipboard>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(JoinedWaitlist);
