import React, { Component } from "react";
import "./../styles/StudyTrial.scss";
import PropTypes from "prop-types";
import KeyCodes from "./../util/KeyCodes";
import calculateBeanValue from "./../util/calculateBeanValue";
import Score from './Score';
import SelectionDetails from './SelectionDetails';

class StudyTrial extends Component {
  constructor(){
    super();
    this.state = {
      currentBeanIndex: 0,
      startTime: Date.now(),
      waiting: false,
      currentBeanValue: null,
      timeout: null,
    };
  }
  componentDidUpdate(){
    this.refs.study.focus();
  }
  componentDidMount(){
    this.refs.study.focus();
  }
  componentWillReceiveProps() {
    console.log('hit');
    // Advance after 5000ms
    let timeout = setTimeout(() => {
      console.log('FIE');
      let beansLeft = (this.props.beans.length - 1) - this.state.currentBeanIndex;
      this.props.handleResponse('XXX', this.props.beans[this.state.currentBeanIndex], this.state.currentBeanIndex, 5000, beansLeft);
      clearTimeout(timeout);
      this.setState({
        currentBeanIndex: this.state.currentBeanIndex + 1,
        startTime: Date.now(),
        waiting: false,
        currentBeanValue: null,
        timeout: null,
      });
    }, 5000);

    if (!this.state.timeout) {
      this.setState({
        timeout,
      });
    }
  }
  handleKeyDown(event){
    if(this.state.waiting) return;
    let key = KeyCodes[event.which];
    if(key === 'd' || key === 'k') {
      let currentBeanValue = calculateBeanValue(this.props.condition, this.props.beans[this.state.currentBeanIndex]);
      clearTimeout(this.state.timeout);
      this.setState({
        waiting: true,
        timeout: null,
        currentBeanValue,
      }, () => {
         setTimeout(() => {
           let startTime = this.state.startTime;
           let endTime = Date.now();
           let responseTime = endTime - startTime;
           let beansLeft = (this.props.beans.length - 1) - this.state.currentBeanIndex;
           this.props.handleResponse(key, this.props.beans[this.state.currentBeanIndex], this.state.currentBeanIndex, responseTime, beansLeft);
           
           this.setState({
             currentBeanIndex: this.state.currentBeanIndex + 1,
             startTime: Date.now(),
             waiting: false,
             currentBeanValue: null,
           });
         }, 3000);
      });
    }
  } 
  renderInstructions(){
    if(this.props.testPhase === true) {
      return (
        <div className="Instructions">
          <div>[d] = The bean is harmful</div>
          <div>[k] = The bean is helpful</div>
        </div>
      );
    }

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
        {this.props.hideScore ? null : <Score score={this.props.score} />}
        {this.state.waiting ? <SelectionDetails currentBeanValue={this.state.currentBeanValue}/> : null }
      </div>
    );
  }
}

StudyTrial.propTypes = {
  beans: PropTypes.array.isRequired,
  handleResponse: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  hideScore: PropTypes.bool,
};

export default StudyTrial;
