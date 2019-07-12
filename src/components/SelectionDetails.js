/**
 * Author: Sam Heutmaker [samheutmaker@gmail.com]
 */

import React, { Component } from "react";
import "./../styles/SelectionDetails.scss";
import PropTypes from "prop-types";

class SelectionDetails extends Component {
  render() {
    return (
      <div className="SelectionDetails">
        <div className="FlexRow">
          <div>DECISION:</div>
          <div>{this.props.currentBeanSelected ? 'YES' : 'NO'}</div>
        </div>
        <div className="FlexRow">
          <div>{this.props.currentBeanSelected ? 'EFFECT OF BEAN:' : 'EFFECT BEAN WOULD HAVE HAD:'}</div>
          <div>{this.props.currentBeanValue}</div>
        </div>
        <div className="FlexRow">
          <div>NET GAIN OR LOSS:</div>
          <div>{this.props.currentBeanSelected ? this.props.currentBeanValue : '0'}</div>
        </div>
      </div>
    );
  }
}

SelectionDetails.propTypes = {
  currentBeanSelected: PropTypes.boolean,
  currentBeanValue: PropTypes.number,
};

export default SelectionDetails;
