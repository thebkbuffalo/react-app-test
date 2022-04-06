import React, { Component } from "react";
import './App.css';
import TodoListsContainer from "./components/TodoListsContainer";

class App extends Component {
  render() {
    return (
      <div className="mainContainer">
        <div className="topHeading">
          <h1>A Simple To-Do List App</h1>
        </div>
        <TodoListsContainer />
      </div>
    );
  }
}

export default App;
