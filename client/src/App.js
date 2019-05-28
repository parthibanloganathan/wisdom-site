import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import JoinedWaitlist from './JoinedWaitlist';

class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={LandingPage} />
          <Route path="/waitlist" component={JoinedWaitlist} />
        </div>
      </BrowserRouter>
    )
  }
}

export default Root;