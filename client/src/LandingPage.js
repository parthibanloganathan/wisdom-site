import React, { Component } from "react";
import axios from 'axios';
import { Typography } from "@material-ui/core";

export default class LandingPage extends Component {
    state = {
        __html: "",
        loading: true
    }

    componentWillMount() {
        console.log("fetching landing");
        axios.get(`/landing`)
            .then(res => {
                return res.data;
            })
            .then(content => {
                console.log('setting state');
                this.setState({
                    __html: content
                }, () => {
                    this.setState({ loading: false });
                });
            })
            .catch(err => {
                // handle the error
            });
    }

    render() {
        if (this.state.loading) {
            return <Typography>Loading...</Typography>;
        }

        return (
            <div dangerouslySetInnerHTML={this.state} />
        );
    }
}
