import React, { Component } from 'react';
import './App.css';
import { TodoListClassComponent } from './TodoListClassComponent';
import { TodoListFunctionComponent } from './TodoListFunctionComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoListClassComponent />
        <TodoListFunctionComponent />
      </div>
    );
  }
}

export default App;
