import React, { Component } from 'react';
import './../styles/Study.scss';
import DialogueScreen from './DialogueScreen';
import StudyTrial from './StudyTrial';
import oneRandom from './../util/oneRandom';
import calculateBeanValue from './../util/calculateBeanValue';

import {
  learningGroup1,
  learningGroup2,
  learningGroup3,
  learningGroup4,
  learningGroup5,
  learningGroup6,
  gameBeans,
  testBeans,
} from './../util/BeanGroups';

class Study extends Component {
  constructor() {
    super();
    this.state = {
      currentStageIndex: 0,
      condition: 1,
      score: 50,
      responses: [],
    };
  }

  advanceToNextStage() {
    this.setState({
      currentStageIndex: this.state.currentStageIndex + 1,
    });
  }
  handleResponse(response, bean, beanIndex, responseTime, beansLeft) {
    let currentBeanValue = calculateBeanValue(this.state.condition, bean);
    let score = this.state.score + (response === "d" ? 0 : currentBeanValue);
    let responses = { ...this.state.response };


    let date = new Date(Date.now()).toString();
    let parts = date.split(' ');
    date = parts.splice(0, 4);
    date = date.join(' ');
    let time = parts.join(' ');

    let newResponse = {
      date: date,
      time: time,
      subjectId: this.state.subjectId,
      condition: this.state.condition,
      block: this.state.currentStageIndex + 1,
      currentTrial: beanIndex + 1,
      response: response,
      responseTime: responseTime,
      bean: bean,
      currentBeanValue: currentBeanValue,
    };

    responses.push(newResponse);

    this.setState({
      score,
      responses,
    }, () => {
      if (beansLeft === 0) {
        this.advanceToNextStage();
      }
    });
  }
  goToNextScreen() {
    this.advanceToNextStage();
  }
  renderStages(index) {
    let stages = [
      <DialogueScreen key={1} dialogue='1' goToNextScreen={this.goToNextScreen.bind(this)} />, // Introduction
      <DialogueScreen key={2} dialogue='2' goToNextScreen={this.goToNextScreen.bind(this)} />, // Instructions
      <StudyTrial key={3} score={this.state.score} beans={[
        oneRandom(learningGroup1),
        oneRandom(learningGroup2),
        oneRandom(learningGroup3),
        oneRandom(learningGroup4),
        oneRandom(learningGroup5),
        oneRandom(learningGroup6),
      ]} handleResponse={this.handleResponse.bind(this)} />, // test
      <DialogueScreen key={4} dialogue='3' goToNextScreen={this.goToNextScreen.bind(this)} />, // pracitce blocks complete
      <DialogueScreen key={5} dialogue='4' goToNextScreen={this.goToNextScreen.bind(this)} />, // learning phase 1
      <StudyTrial key={6} score={this.state.score} beans={gameBeans} handleResponse={this.handleResponse.bind(this)} />, // learning block 1
      <DialogueScreen key={7} dialogue='5' goToNextScreen={this.goToNextScreen.bind(this)} />, // first learning block complete -- take a break
      <DialogueScreen key={8} dialogue='6' goToNextScreen={this.goToNextScreen.bind(this)} />, // second learning block - continue where left off
      <StudyTrial key={9} score={this.state.score} beans={gameBeans} handleResponse={this.handleResponse.bind(this)} />, // learning block 2
      <DialogueScreen key={10} dialogue='7' goToNextScreen={this.goToNextScreen.bind(this)} />, // second block complete -- take a break
      <DialogueScreen key={11} dialogue='8' goToNextScreen={this.goToNextScreen.bind(this)} />, // third block start -- continue where left off
      <StudyTrial key={12} score={this.state.score} beans={gameBeans} handleResponse={this.handleResponse.bind(this)} />, // learning block 3
      <DialogueScreen key={13} dialogue='9' goToNextScreen={this.goToNextScreen.bind(this)} />, // Final phase -- actual test
      <StudyTrial key={14} score={this.state.score} beans={testBeans} handleResponse={this.handleResponse.bind(this)} />, // this is the test!
      <DialogueScreen key={15} dialogue='10' goToNextScreen={this.goToNextScreen.bind(this)} /> // Goodbyee!
    ];

    return stages[index];
  }
  render() {
    return (
      <div className='BeanFest'>
        {this.renderStages(this.state.currentStageIndex)}
      </div>
    );
  }
}

export default Study;
