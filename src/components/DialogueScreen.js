import React, { Component } from "react";
import "./../styles/DialogueScreen.scss";
import PropTypes from 'prop-types';
import KeyCodes from './../util/KeyCodes';

class DialogueScreen extends Component {
  dialogues = {
    1: [
      "You are going to play a game that we call BEANFEST. The game involves beans and points. Your point value can range from 0 to 100. It can never be less than 0 or greater than 100. The goal of the game is to choose beans in such a way as to gain points and avoid losing points. ",
      "The shapes of the beans vary from circular to oval to oblong. The beans are also marked by anywhere from very few to some to many speckles. Some of these beans are helpful and some are harmful. In order to gain points, you must learn which is which.",
      "You will start out with 50 points. On each trial, you will be presented with a bean and must choose whether or not to select it. If you select the bean, you will gain 10 points if it is a helpful bean (up to a maximum of 100 points), or you will lose 10 points if it is a harmful bean. If you do not select it, it will have no effect on your point total. If your point total reaches 0 or 100, the game will restart.",
      "Press the [n] key to continue."
    ],
    2: [
      "You will start with 6 practice trials so that you can see how the game works.On these practice trials, you will see a few of the beans that will appear when the actual game begins.On each of the following trials:",
      "Press the[k] key to SELECT the bean.",
      "Press the[d] key to NOT SELECT the bean.",
      "These practice trials are your first chance to begin learning about the beans.After the practice is complete, your points will be restored to 50 points.",
      "Press the[n] key to start the practice session!"
    ],
    3: [
      "The practice block is now complete. You may take a brief rest at this time. When you are ready, press the [n] key to continue."
    ],
    4: [
      "The learning phase of the game will now begin. On the next block of trials, you will see more beans.",
      "Press the [k] key to SELECT the bean. ",
      "Press the [d] key to NOT SELECT the bean. ",
      "If your point total goes to 0 or 100, the game will restart.",
      "Press the [n] key to start!"
    ],
    5: [
      "The first learning block is now complete. You may take a brief rest at this time. When you are ready, press the [n] key to continue."
    ],
    6: [
      "The next block of trials continues where you left off before.",
      "Press the [n] key to start!",
    ],
    7: [
      "The second learning block is now complete. You may take a brief rest at this time. When you are ready, press the [n] key to continue."
    ],
    8: [
      "The next block of trials continues where you left off before.",
      "Press the [n] key to start!"
    ],
    9: [
      "In this final test phase of the experiment, you will be presented with the beans to which you were exposed earlier.  No point meter or feedback will be displayed.  In this part of the experiment, we simply want to know whether you believe a given bean to be good or bad. ",
      "Again, use the keyboard.  Press the [k] key (the one on the right) if this is a bean that you would select, i.e., one that you believe increases your points level. ",
      "Press the [d] key (the one on the left) if this is a bean that you would not select, i.e., one that you believe would decrease your points. ",
      "Try to respond as accurately and as quickly as possible.  Don't be in such a hurry that you regret your response.  But, try to respond as quickly as you can without sacrificing accuracy.  So, maximize both the speed and the accuracy of your responses.  Be sure to respond on each and every trial.  If you are unsure, then guess.  But respond within the allotted 5 seconds.",
      "There is no practice block.  So be ready.",
      "Press the [n] key to continue."
    ],
    10: [
      "You are now done with this part of the experiment.",
      "Please let the experimenter know you are finished."
    ]
  };
  componentDidUpdate() {
    this.refs.dialogue.focus();
  }
  componentDidMount() {
    this.refs.dialogue.focus();
  }
  handleKeyDown(event) {
    let keyCode = KeyCodes[event.which];
    if (keyCode === 'n') {
      this.props.goToNextScreen();
    };
  }
  render() {
    return (
      <div ref="dialogue"
           className="DialogueScreen"
           onKeyDown={event => this.handleKeyDown(event)} tabIndex="0">
        {this.dialogues[this.props.dialogue].map((d, i) => {
          return (
            <div className="Text" key={i}>
              {d}
            </div>
          );
        })}
      </div>
    );
  }
}

DialogueScreen.propTypes = {
  dialogue: PropTypes.string.isRequired,
  goToNextScreen: PropTypes.func.isRequired,
};

export default DialogueScreen;
