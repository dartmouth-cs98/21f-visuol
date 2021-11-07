/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import NewOfferForm from './components/NewOffer/NewOfferForm';

import Logout from './Logout';
import LoadGraphs from './examples/LoadGraphs';

class Routes extends Component {
  display() {
    if (this.props.loggedIn) {
      return (
        <Switch>
          <Route path="/loadGraph" component={LoadGraphs} />
          <Route path="/new-offer" component={NewOfferForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Home} />
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
