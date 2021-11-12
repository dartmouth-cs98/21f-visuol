import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import NewOfferForm from './NewOfferForm';
import LoadGraphs from './examples/LoadGraphs';

import Logout from './Logout';

class Routes extends Component {
  display() {
    const { loggedIn } = this.props;

    if (loggedIn) {
      return (
        <Switch>
          <Route path="/loadGraph" component={LoadGraphs} />
          <Route path="/new-offer" component={NewOfferForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Home} />
          <Route path="/loadGraph/:company" component={}/>
        </Switch>
      );
    }
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route path="/" component={Home} />
      </Switch>
    );
  }

  render() {
    return (
      <div>
        {this.display()}
      </div>
    );
  }
}

export default Routes;
