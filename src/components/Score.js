import React, { Component } from "react";
import "./../styles/Score.scss";
import PropTypes from "prop-types";

const SCORE_BAR_WIDTH = 400;

class Score extends Component {
  getPositiveWidth(){
    return this.props.score * (SCORE_BAR_WIDTH / 100);
  }
  render() {
    return (
      <div className="Score">
        <div className="ScoreNumeric">{this.props.score} points</div>
        <div className="ScoreBar">
          <div className="Positive" style={{width: this.getPositiveWidth()}}></div>
        </div>
      </div>
    );
  }
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
};

export default Score;
