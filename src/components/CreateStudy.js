import React, { Component } from 'react';
import './../styles/Login.scss';
import { Link } from 'react-router-dom';
import client from './../util/client';

class CreateStudy extends Component {
  constructor() {
    super();
    
    this.state = {
      name: '',
      error: null,
    };
  }
  setField(value, field) {
    this.setState({
      [field]: value,
      error: null,
    });
  }
  createStudy() {
    let { name } = this.state;

    client.createStudy(name)
    .then(res => {
      console.log(res);
      this.props.history.push("/dashboard/studies");
    })
    .catch(err => {
      this.setState({
        error: err,
      });
    })
  }
  renderError() {
    if(this.state.error) {
      return (
        <div className="Error">
          {this.state.error}
        </div>
      );
    }
  }
  render() {
    return (
      <div className='Login FlexColumn JustifyCenter AlignCenter' onKeyPress={e => {
        if (e.which === 13) {
          this.createStudy();
        }
      }}>
        <div className="LargeText">Fill out the fields below to create a study.</div>
        <div className="LoginForm FlexColumn JustifyCenter AlignCenter">
          <input autoFocus value={this.state.name} placeholder="Study Name" onChange={e => this.setField(e.target.value, 'name')} type="text" />
          <div className="Button" onClick={(() => this.createStudy())}>
            Create Study
          </div>
          {this.renderError()}
        </div>
      </div>
    );
  }
}

export default CreateStudy;
