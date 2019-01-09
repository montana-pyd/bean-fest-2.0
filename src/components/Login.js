import React, { Component } from 'react';
import './../styles/Login.scss';
import { Link } from 'react-router-dom';
import client from './../util/client';

class Login extends Component {
  constructor() {
    super();
    
    this.state = {
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
  login() {
    let { email, password } = this.state;

    client.login(email, password)
    .then(res => {
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
          this.login();
        }
      }}>
        <div className="LargeText">Login below or <Link className="LargeText" to="/register">register</Link></div>
        <div className="LoginForm FlexColumn JustifyCenter AlignCenter">
          <input autoFocus value={this.state.email} placeholder="Email" onChange={e => this.setField(e.target.value, 'email')} type="text" />
          <input value={this.state.password} placeholder="Password" onChange={e => this.setField(e.target.value, 'password')} type="password" />
          <div className="Button" onClick={(() => this.login())}>
            Login
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

export default Login;
