import React, { Component } from 'react';
import './App.css';
import { TodoListClassComponent } from './TodoListClassComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoListClassComponent />
      </div>
    );
  }
}

export default App;
