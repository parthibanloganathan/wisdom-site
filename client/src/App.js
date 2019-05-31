import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import JoinedWaitlist from './JoinedWaitlist';
import EmailVerified from './EmailVerified';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Page404 from './Page404';

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
            <Route path="/verify" component={EmailVerified} />
            <Route path="/" component={Page404} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default Root;