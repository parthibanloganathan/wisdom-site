import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import queryString from 'query-string'

class JoinedWaitlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            referralLink: 'blah'
        }
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        this.setState({ email: values.email });
        this.setState({ referralLink: values.ref });

        axios.post('/joinwaitlist', {
            'email': this.state.email
        }).then(function (response) {
            console.log(response);
            this.setState({ referralLink: 'https://' + window.location + '?ref=' + response.referralCode });
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="JoinedWaitlist">
                <Typography variant="h1" gutterBottom>You're on the waitlist!</Typography>
                Share Wisdom with friends to move up the waitlist! Here's your referral link: {this.state.referralLink}
            </div>
        );
    }
}

export default JoinedWaitlist;
