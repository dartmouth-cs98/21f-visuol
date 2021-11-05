import Login from './Login';
import Registration from './Registration';
import Home from './Home';
import NewOfferForm from './components/NewOffer/NewOfferForm';
import LoadGraphs from './LoadGraphs';

import { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import Logout from './Logout';

class Routes extends Component {
    display() {
        if(this.props.loggedIn) {
            return (
              <Switch>
                <Route path="/loadGraph" component={LoadGraphs} />
                <Route path="/new-offer" component={NewOfferForm} />
                <Route path="/logout" component={Logout} />
                <Route path="/" component={Home} />
              </Switch>
            );
          } else {
              return(
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Registration} />
                  <Route path="/" component={Home} />
                </Switch>
              );
          }
    }

    render() {
        return(
            <div>
                {this.display()}
            </div>
        );
    }
}

export default Routes;