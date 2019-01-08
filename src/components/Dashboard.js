import React, { Component } from 'react';
import './../styles/Dashboard.scss';
import client from "./../util/client";

class Dashboard extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="Dashboard">
        This is the dashboard.
      </div>
    );
  }
}

export default Dashboard;
