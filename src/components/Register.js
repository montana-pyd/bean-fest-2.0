import React, { Component } from 'react';
import './../styles/Login.scss';
import { Link } from 'react-router-dom';
import client from "./../util/client";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: null,
    };
  }
  setField(value, field) {
    this.setState({
      [field]: value,
      error: null,
    });
  }
  register() {
    let { firstName, lastName, email, password } = this.state;

    client.register(firstName, lastName, email, password)
      .then(res => {
        this.props.history.push('/dashboard/studies');
      })
      .catch(err => {
        this.setState({
          error: err,
        });
      })
  }
  renderError() {
    if (this.state.error) {
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
        if(e.which === 13) {
          this.register();
        }
      }}>
        <div className="LargeText">Register below or <Link className="LargeText" to="/login">login</Link></div>
        <div className="LoginForm FlexColumn JustifyCenter AlignCenter">
          <input autoFocus value={this.state.firstName} placeholder="First Name" onChange={e => this.setField(e.target.value, 'firstName')} type="text" />
          <input value={this.state.lastName} placeholder="Last Name" onChange={e => this.setField(e.target.value, 'lastName')} type="text" />
          <input value={this.state.email} placeholder="Email" onChange={e => this.setField(e.target.value, 'email')} type="text" />
          <input value={this.state.password} placeholder="Password" onChange={e => this.setField(e.target.value, 'password')} type="password" />
          <div className="Button" onClick={() => this.register()}>
            Register
          </div>
          <div className="Button" onClick={(() => this.props.history.push('/'))}>
            Home
          </div>
          {this.renderError()}
        </div>
      </div>
    );
  }
}

export default Register;
