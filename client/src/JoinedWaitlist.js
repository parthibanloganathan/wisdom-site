import React, { Component } from 'react';
import { IconButton, TextField, Tooltip, Typography } from '@material-ui/core';
import FileCopy from '@material-ui/icons/FileCopy';
import axios from 'axios';
import queryString from 'query-string'
import { CopyToClipboard } from 'react-copy-to-clipboard';

class JoinedWaitlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            referralLink: '',
            referralSource: '',
            copied: false
        }
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        this.setState({ email: values.email });
        this.setState({ referralSource: values.ref });

        axios.post('/joinwaitlist', {
            'email': values.email,
            'referralSource': values.ref
        }).then(response => {
            var url = window.location.protocol + '//' + window.location.host;
            var constructedLink = url + '?ref=' + response.data.referralCode;
            this.setState({ referralLink: constructedLink });
        }).catch(error => {
            console.log(error);
        });
    }

    onCopy = () => {
        this.setState({ copied: true });
    };

    render() {
        return (
            <div className="JoinedWaitlist">
                <Typography variant="h2" gutterBottom>You're on the waitlist!</Typography>
                <Typography>Share Wisdom with friends to move up the waitlist! Here's your referral link:</Typography>
                <TextField
                    ref="ReferralLinkTextField"
                    label="Referral Link"
                    variant="outlined"
                    style={{ width: 320 }}
                    value={this.state.referralLink}
                    InputProps={{ readOnly: true }}
                    margin="normal"
                />
                <CopyToClipboard onCopy={this.onCopy} text={this.state.referralLink}>
                    <Tooltip title="Copy link">
                        <IconButton>
                            <FileCopy />
                        </IconButton>
                    </Tooltip>
                </CopyToClipboard>

                {this.state.copied ? <Typography>Copied to clipboard</Typography> : <div></div>}
            </div>
        );
    }
}

export default JoinedWaitlist;
