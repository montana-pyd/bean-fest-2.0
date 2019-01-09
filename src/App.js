import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import Login from './components/Login';
import Studies from "./components/Studies";
import Study from './components/Study';
import CreateStudy from './components/CreateStudy';


class App extends Component {
  render() {
    return (
      <main className="App">
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard/create-study" component={CreateStudy} />
          <Route exact path="/dashboard/studies" component={Studies} />
          <Route exact path="/study" component={Study} />
        </Switch>
      </main>
    );
  }
}

export default App;
