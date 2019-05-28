import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import JoinedWaitlist from './JoinedWaitlist';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

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
            <Route path="/waitlist" component={JoinedWaitlist} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

export default Root;