import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import JoinedWaitlist from './JoinedWaitlist';
import EmailVerified from './EmailVerified';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import BusinessInquiry from './BusinessInquiry';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#FFFFFF'
    },
    primary: {
      main: '#3BB4C1'
    }
  }
});

class Root extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Route path="/waitlist" exact component={JoinedWaitlist} />
            <Route path="/verify" exact component={EmailVerified} />
            <Route path="/inquiry" exact component={BusinessInquiry} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default Root;