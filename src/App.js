import React, { Component } from 'react';
import './styles/App.scss';
import DialogueScreen from './components/DialogueScreen';
import StudyTrial from './components/StudyTrial';
import {
  learningGroup1,
  learningGroup2,
  learningGroup3,
  learningGroup4,
  learningGroup5,
  learningGroup6,
  gameBeans,
  testBeans,
} from './util/BeanGroups';


class App extends Component {
  constructor(){
    super();
    this.state = {
      currentStageIndex: 0,
    };
  }

  stages = [
    <DialogueScreen key={1} dialogue="1" goToNextScreen={this.goToNextScreen.bind(this)} />, // Introduction
    <DialogueScreen key={2} dialogue="2" goToNextScreen={this.goToNextScreen.bind(this)} />, // Instructions
    <StudyTrial key={3} beans={learningGroup1} handleResponse={this.handleResponse.bind(this)} />, // test
    <StudyTrial key={4} beans={learningGroup2} handleResponse={this.handleResponse.bind(this)} />, // test
    <StudyTrial key={5} beans={learningGroup3} handleResponse={this.handleResponse.bind(this)} />, // test
    <StudyTrial key={6} beans={learningGroup4} handleResponse={this.handleResponse.bind(this)} />, // test
    <StudyTrial key={7} beans={learningGroup5} handleResponse={this.handleResponse.bind(this)} />, // test
    <StudyTrial key={8} beans={learningGroup6} handleResponse={this.handleResponse.bind(this)} />, // test
    <DialogueScreen key={9} dialogue="3" goToNextScreen={this.goToNextScreen.bind(this)} />, // pracitce blocks complete
    <DialogueScreen key={10} dialogue="4" goToNextScreen={this.goToNextScreen.bind(this)} />, // learning phase 1
    <StudyTrial key={11} beans={gameBeans} handleResponse={this.handleResponse.bind(this)} />, // learning block 1
    <DialogueScreen key={12} dialogue="5" goToNextScreen={this.goToNextScreen.bind(this)} />, // first learning block complete -- take a break
    <DialogueScreen key={13} dialogue="6" goToNextScreen={this.goToNextScreen.bind(this)} />, // second learning block - continue where left off
    <StudyTrial key={14} beans={gameBeans} handleResponse={this.handleResponse.bind(this)} />, // learning block 2
    <DialogueScreen key={15} dialogue="7" goToNextScreen={this.goToNextScreen.bind(this)} />, // second block complete -- take a break
    <DialogueScreen key={16} dialogue="8" goToNextScreen={this.goToNextScreen.bind(this)} />, // third block start -- continue where left off
    <StudyTrial key={17} beans={gameBeans} handleResponse={this.handleResponse.bind(this)} />, // learning block 3
    <DialogueScreen key={18} dialogue="9" goToNextScreen={this.goToNextScreen.bind(this)} />, // Final phase -- actual test
    <StudyTrial key={19} beans={testBeans} handleResponse={this.handleResponse.bind(this)} />, // this is the test!
    <DialogueScreen key={20} dialogue="10" goToNextScreen={this.goToNextScreen.bind(this)} /> // Goodbyee!
  ];

  advanceToNextStage(){
    this.setState({
      currentStageIndex: this.state.currentStageIndex + 1,
    });
  }
  handleResponse(response, responseTime, beanName, beansLeft) {
    
    console.log(response, responseTime, beanName, beansLeft);

    if(beansLeft === 0) {
      this.advanceToNextStage();
    }
  }
  goToNextScreen() {
    this.advanceToNextStage();
  }
  render() {
    return (
      <div className="BeanFest">
        {this.stages[this.state.currentStageIndex]}
      </div>
    );
  }
}

export default App;
