import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Welcome from "./components/Welcome";
import Login from './components/Login';
import Register from "./components/Register";
import Study from './components/Study';


class App extends Component {
  render() {
    return (
      <main className="App">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/study" component={Study} />
          {/* <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/onboarding" component={Onboarding} /> */}
        </Switch>
      </main>
    );
  }
}

export default App;
