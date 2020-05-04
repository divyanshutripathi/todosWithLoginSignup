import React, { Component } from "react";
import Login from "./components/login";
import Signup from "./components/signup";
import Navigation from "./components/Navigation/Navigation";
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    let myTasks = [
      { text: "todo1", status: "passive" },
      { text: "todo2 ", status: "active" },
      { text: "todo3", status: "passive" },
    ];
    let localTasks = localStorage.getItem("tasks");
    if (localTasks !== null) {
      localTasks = JSON.parse(localTasks);
      myTasks = localTasks;
    }
    this.state = {
      route: "signin",
      isSignedIn: false,
      user: {
        email: "",
      },
      tasks: myTasks,
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        email: data.email,
      },
    });
  };

  onRouteChange = (route) => {
    console.log("onRouteChange : ", route);
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "todos") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  addTask = async (task) => {
    let updatedList = this.state.tasks;
    updatedList.push({ text: task, status: "passive" });
    this.setState({ tasks: updatedList });
    this.updateLocalStorage(updatedList);
  };

  removeTask = async (task_id) => {
    let updatedList = this.state.tasks;
    updatedList.splice(task_id.replace("task_", ""), 1);
    this.setState({ tasks: updatedList });
    this.updateLocalStorage(updatedList);
  };

  doneTask = async (task_id) => {
    let updatedList = this.state.tasks;
    let currentStatus = updatedList[task_id.replace("task_", "")].status;
    let newStatus = "active";
    if (currentStatus === "active") {
      newStatus = "passive";
    }
    updatedList[task_id.replace("task_", "")].status = newStatus;
    this.setState({ tasks: updatedList });
    this.updateLocalStorage(updatedList);
  };

  updateLocalStorage = (updatedList) => {
    var updatedList = JSON.stringify(updatedList);
    localStorage.setItem("tasks", updatedList);
    return true;
  };

  render() {
    const { isSignedIn, route } = this.state;
    console.log("state : ", this.state);
    return (
      <div className="App">
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "todos" ? (
          <div>
            <TodoForm addTask={this.addTask} />
            <TodoList
              myList={this.state.tasks}
              addTask={this.addTask}
              removeTask={this.removeTask}
              doneTask={this.doneTask}
            />
          </div>
        ) : route === "login" ? (
          <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Signup loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}
export default App;
