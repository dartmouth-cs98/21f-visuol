import { React, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import Health from './HealthDict';
import NewOfferForm from './components/NewOffer/NewOfferForm';
import CompensationLayout from './components/compensation/compensation-layout';
import ComparisonLayout from './components/comparison/ComparisonLayout';
import Logout from './Logout';

class Routes extends Component {
  display() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      return (
        <Switch>
          <Route path='/21f-visuol/loadGraphs/:company/:id' component={CompensationLayout} />
          <Route path='/21f-visuol/loadGraph' component={CompensationLayout} />
          <Route path='/21f-visuol/new-offer' component={NewOfferForm} />
          <Route path='/21f-visuol/compare' component={ComparisonLayout} />
          <Route path='/21f-visuol/logout' component={Logout} />
          <Route path='/21f-visuol/health' component={Health} />
          <Route path='/21f-visuol/' component={Home} />
        </Switch>
      );
    }
    return (
      <Switch>
        <Route path='/21f-visuol/login' component={Login} />
        <Route path='/21f-visuol/register' component={Registration} />
        <Route path='/21f-visuol/compensation-layout' component={CompensationLayout} />
        <Route path='/21f-visuol/' component={Home} />
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
