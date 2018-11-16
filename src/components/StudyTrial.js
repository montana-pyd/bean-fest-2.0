import React, { Component } from "react";
import "./../styles/StudyTrial.scss";
import PropTypes from "prop-types";
import KeyCodes from "./../util/KeyCodes";
import Score from './Score';

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
    let key = KeyCodes[event.which];
    if(key === 'd' || key === 'k') {
      let startTime = this.state.startTime;
      let endTime = Date.now();
      let responseTime = endTime - startTime;
      let beansLeft = (this.props.beans.length - 1) - this.state.currentBeanIndex;
      this.props.handleResponse(key, this.props.beans[this.state.currentBeanIndex], this.state.currentBeanIndex, responseTime, beansLeft);

      this.setState({
        currentBeanIndex: this.state.currentBeanIndex + 1,
        startTime: Date.now(),
      });
    }
  } 
  renderInstructions(){
    return (
      <div className="Instructions">
        <div>[d] = Do not select the bean</div>
        <div>[k] = Select the bean</div>
      </div>
    );
  }
  render() {
    let source = `images/${this.props.beans[this.state.currentBeanIndex]}`;
    return (
      <div ref="study" className="StudyTrial" onKeyDown={event => this.handleKeyDown(event)} tabIndex="0">
        {this.renderInstructions()}
        <img alt={source} src={source} />
        <Score score={this.props.score} />
      </div>
    );
  }
}

StudyTrial.propTypes = {
  beans: PropTypes.array.isRequired,
  handleResponse: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default StudyTrial;
