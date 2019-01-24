import React, { Component } from 'react';
import './../styles/Welcome.scss';
import { Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }
  render() {
    return (
      <div>
        <h1>Welcome to BeanFest. Choose an opton below.</h1>
        <div className='WelcomeOptions FlexRow JustifyCenter AlignCenter'>
          <Link to="/study" className="Flex1 FlexRow JustifyCenter AlignCenter LargeText">
            Play BeanFest
          </Link>
          <Link to="/login" className="Flex1 FlexRow JustifyCenter AlignCenter LargeText">
            Create a Study
          </Link>
        </div>
      </div>
    );
  }
}

export default App;
