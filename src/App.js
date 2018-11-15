import React, { Component } from 'react';
import './styles/App.scss';
import DialogueScreen from './components/DialogueScreen';

class App extends Component {
  render() {
    return (
      <div className="BeanFest">
        <DialogueScreen dialogue="1"/>
      </div>
    );
  }
}

export default App;
