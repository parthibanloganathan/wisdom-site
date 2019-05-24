import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import StaticContainer from './StaticContainer';
import JoinedWaitlist from './JoinedWaitlist';

class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={StaticContainer} />
          <Route path="/waitlist" component={JoinedWaitlist} />
        </div>
      </BrowserRouter>
    )
  }
}

export default Root;