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

const stages = [
  <DialogueScreen dialogue="1" />, // Introduction
  <DialogueScreen dialogue="2" />, // Instructions
  <StudyTrial beans={learningGroup1} handleResponse={this.handleResponse} />, // test
  <StudyTrial beans={learningGroup2} handleResponse={this.handleResponse} />, // test
  <StudyTrial beans={learningGroup3} handleResponse={this.handleResponse} />, // test
  <StudyTrial beans={learningGroup4} handleResponse={this.handleResponse} />, // test
  <StudyTrial beans={learningGroup5} handleResponse={this.handleResponse} />, // test
  <StudyTrial beans={learningGroup6} handleResponse={this.handleResponse} />, // test
  <DialogueScreen dialogue="3" />, // pracitce blocks complete
  <DialogueScreen dialogue="4" />, // learning phase 1
  <StudyTrial beans={gameBeans} handleResponse={this.handleResponse} />, // learning block 1
  <DialogueScreen dialogue="5" />, // first learning block complete -- take a break
  <DialogueScreen dialogue="6" />, // second learning block - continue where left off
  <StudyTrial beans={gameBeans} handleResponse={this.handleResponse} />, // learning block 2
  <DialogueScreen dialogue="7" />, // second block complete -- take a break
  <DialogueScreen dialogue="8" />, // third block start -- continue where left off
  <StudyTrial beans={gameBeans} handleResponse={this.handleResponse} />, // learning block 3
  <DialogueScreen dialogue="9" />, // Final phase -- actual test
  <StudyTrial beans={testBeans} handleResponse={this.handleResponse} />, // this is the test!
  <DialogueScreen dialogue="10" /> // Goodbyee!
];

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentStageIndex: 0,
      currentGroup: null,
    };
  }
  advanceToNextStage(){
    this.setState({

    });
  }
  handleResponse(response, responseTime, beanName) {
    console.log(response, responseTime, beanName);
  }
  render() {
    return (
      <div className="BeanFest">
        <StudyTrial beans={learningGroup1} handleResponse={this.handleResponse} />
      </div>
    );
  }
}

export default App;
