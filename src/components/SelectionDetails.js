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
        Current Bean Value: {this.props.currentBeanValue}
      </div>
    );
  }
}

SelectionDetails.propTypes = {
  currentBeanValue: PropTypes.number,
};

export default SelectionDetails;
