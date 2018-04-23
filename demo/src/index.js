import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';

import { PrivateRoute, Login } from '../../src';

const PublicRoute = () => <h3>This Route is public</h3>;
const RestrictedRoute = () => <h3>This Route is restricted!</h3>;

class Demo extends Component {
  state = {
    auth: {
      isAuthenticated: false
    }
  };
  login = cred => {
    this.setState(() => ({ auth: { isAuthenticated: true } }));
  };
  logout = cred => {
    this.setState(() => ({ auth: { isAuthenticated: false } }));
  };
  render() {
    const { auth } = this.state;
    return (
      <Router>
        <div>
          <h1>nr-react-private-route Demo</h1>
          <ul>
            <li>
              <Link to="/public">Public</Link>
            </li>
            <li>
              <Link to="/private">Private</Link>
            </li>
            {auth.isAuthenticated && (
              <li>
                <button onClick={this.logout}>Logout</button>
              </li>
            )}
          </ul>
          <pre>{JSON.stringify(auth, null, 2)}</pre>
          <Switch>
            <Route
              path="/login"
              render={props => (
                <Login auth={auth} {...props}>
                  <div>
                    <h3>Please login!</h3>
                    <button onClick={this.login}>Login</button>
                  </div>
                </Login>
              )}
            />
            <Route path="/public" component={PublicRoute} />
            <PrivateRoute
              auth={auth}
              path="/private"
              component={RestrictedRoute}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
