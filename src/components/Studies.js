/**
 * Author: Sam Heutmaker [samheutmaker@gmail.com]
 */

import React, { Component } from 'react';
import './../styles/Studies.scss';
import client from "./../util/client";
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      studies: [],
      error: null
    };
  }
  componentDidMount(){
    this.listStudies();
  }
  listStudies() {
    client.listStudies()
    .then(res => {
      this.setState({
        studies: res.studies
      })
    })
    .catch(err => {
      this.setState({
        error: err
      });
    });
  }
  renderNavigation() {
    return (
      <div className="LargeText">View studies below or <Link className="LargeText" to="/dashboard/create-study">create a study</Link></div>
    );
  }
  renderStudies(){
    let { studies } = this.state;
    return (
      <div className="StudiesTable">
        <div className="HeaderRow">
          <div className="TableItem">Name</div>
          <div className="TableItem Flex2">Study ID</div>
          <div className="TableItem FlexHalf">Created</div>
          <div className="TableItem">Actions</div>
        </div>
        {studies.map((study, index) => {
          var dateObj = new Date(study.created);
          var month = dateObj.getUTCMonth() + 1; //months from 1-12
          var day = dateObj.getUTCDate();
          var year = dateObj.getUTCFullYear();

          let created = month + "/" + day + "/" + year;

          return (
            <div className="Row">
              <div className="TableItem">{study.name}</div>
              <div className="TableItem Flex2">{study.studyId}</div>
              <div className="TableItem FlexHalf">{created}</div>
              <div className="TableItem">
                <a href={`/study/results/${study.studyId}`}>Download Study</a>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  render() {
    return (
      <div className="Studies">
        {this.renderNavigation()}
        {this.renderStudies()}
      </div>
    );
  }
}

export default Dashboard;
