import React, { Component } from "react";
import "./../styles/StudyTrial.scss";
import PropTypes from "prop-types";
import KeyCodes from "./../util/KeyCodes";

class StudyTrial extends Component {
  constructor(){
    super();
    this.state = {
      currentBeanIndex: 0,
      startTime: Date.now(),
    };
  }
  componentDidUpdate(){
    this.refs.study.focus();
  }
  componentDidMount(){
    this.refs.study.focus();
  }
  handleKeyDown(event){
    let keyCode = KeyCodes[event.which];
    if(keyCode === 'd' || keyCode === 'k') {
      let startTime = this.state.startTime;
      let endTime = Date.now();
      let responseTime = endTime - startTime;
      let beansLeft = (this.props.beans.length - 1) - this.state.currentBeanIndex;
      this.props.handleResponse(keyCode, this.state.currentBeanIndex, responseTime, beansLeft);

      this.setState({
        currentBeanIndex: this.state.currentBeanIndex + 1,
        startTime: Date.now(),
      }, () => {
        console.log('Done');
      });
    }
  } 
  render() {
    console.log(this.props.beans);
    let source = `images/${this.props.beans[this.state.currentBeanIndex]}`;
    return (
      <div ref="study" className="StudyTrial" onKeyDown={event => this.handleKeyDown(event)} tabIndex="0">
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
