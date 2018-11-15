import React, { Component } from "react";
import "./../styles/StudyTrial.scss";
import PropTypes from "prop-types";

class StudyTrial extends Component {
  constructor(){
    super();
    this.state = {
      currentBeanIndex: 0,
      startTime: Date.now(),
    };
  }
  handleKeyPress(event){
    let keyCode = event.which;
    let startTime = this.state.startTime;
    let endTime = Date.now();
    let responseTime = endTime - startTime;
    this.props.handleResponse(keyCode, this.state.currentBeanIndex, responseTime);

    this.setState({
      currentBeanIndex: this.state.currentBeanIndex + 1,
      startTime: Date.now(),
    }, () => {
      console.log('Done');
    });
  } 
  render() {
    let source = `images/${this.props.beans[this.state.currentBeanIndex]}`;
    return (
      <div className="StudyTrial" onKeyPress={event => this.handleKeyPress(event)} tabIndex="0">
        <img alt={source} src={source} />
      </div>
    );
  }
}

StudyTrial.propTypes = {
  beans: PropTypes.array.isRequired,
  handleResponse: PropTypes.func.isRequired,
};

export default StudyTrial;
