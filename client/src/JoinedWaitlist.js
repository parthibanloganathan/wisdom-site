import React, { Component } from 'react';
import { Container, Grid, IconButton, TextField, Tooltip, Typography } from '@material-ui/core';
import FileCopy from '@material-ui/icons/FileCopy';
import axios from 'axios';
import queryString from 'query-string';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/styles';
import Notifications, { notify } from 'react-notify-toast';
import Page404 from './Page404';
import NeonOwl from './assets/neon.svg';

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
        width: '50%',
        marginTop: 30
    },
    main: {
        textAlign: 'center'
    },
    owl: {
        marginTop: 30,
        width: '5%'
    },
    position: {
        color: '#FFFFFF',
        fontSize: 30
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
    }
}

class JoinedWaitlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            referralLink: null,
            referralSource: null,
            position: null,
            error: false
        }
    }

    isValidEmail = email => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        this.setState({ email: values.email });
        this.setState({ referralSource: values.ref });

        if (!this.isValidEmail(values.email)) {
            console.log('failed');
            this.setState({ error: true });
            return;
        }

        axios.post('/api/joinwaitlist', {
            'email': values.email,
            'referralSource': values.ref
        }).then(response => {
            var url = window.location.protocol + '//' + window.location.host;
            var constructedLink = url + '?ref=' + response.data.referralCode;
            this.setState({ referralLink: constructedLink, position: response.data.position });
        }).catch(error => {
            this.setState({ error: true });
            console.log(error);
        });
    }

    onCopy = () => {
        notify.show('Copied link to clipboard', 'success', 3000);
    };

    render() {
        const { classes } = this.props;

        if (this.state.error) {
            return <Page404 />
        }

        return (
            <Container maxWidth="lg" className={classes.container}>
                <div className={classes.main}>
                    <Notifications />
                    <Typography variant="h2" gutterBottom className={classes.title}>You're on the waitlist!</Typography>
                    <Typography className={classes.text}><span className={classes.position}>{this.state.position - 1}</span> people are ahead of you in line</Typography>
                    <Typography className={classes.text}>Share the Wisdom app with friends to move up the waitlist! Here's your referral link:</Typography>
                    <Grid container spacing={3} className={classes.linkRow}>
                        <Grid item xs={10}>
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
                        <Grid item xs={1}>
                            <CopyToClipboard onCopy={this.onCopy} text={this.state.referralLink}>
                                <Tooltip title="Copy link">
                                    <IconButton className={classes.copyButton}>
                                        <FileCopy />
                                    </IconButton>
                                </Tooltip>
                            </CopyToClipboard>
                        </Grid>
                    </Grid>
                    <img src={NeonOwl} alt="Owl" className={classes.owl} />
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(JoinedWaitlist);
