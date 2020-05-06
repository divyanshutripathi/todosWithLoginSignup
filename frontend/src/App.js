import React, { Component } from "react";
import Login from "./components/login";
import Signup from "./components/signup";
import Navigation from "./components/Navigation/Navigation";
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";
import axios from "axios";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "login",
      isSignedIn: false,
      user: {
        email: "",
      },
      tasks: [],
    };
  }

  loadTodo = () => {
    const token = sessionStorage.getItem("token") || null;
    const user = {
      token,
      email: this.state.user.email,
    };
    axios
      .post("http://localhost:5000/todo/getTodos", { user })
      .then((response) => {
        const { data, status } = response;
        if (data.success && status / 100 === 2) {
          this.setState({ tasks: data.msg });
        }
        if (!status / 100 === 2) {
          alert("check the console");
          console.log(data.msg);
          this.setState({ tasks: [] });
        }
      })
      .catch((err) => {
        console.log("error : ", err);
        alert("check the console");
        console.log(err);
        this.setState({ tasks: [] });
      });
  };

  loadUser = (data) => {
    this.setState({
      user: {
        email: data,
      },
    });
    this.loadTodo();
    localStorage.setItem(
      "login",
      JSON.stringify({ email: data, isSignedIn: true })
    );
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "todos") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  addTask = async (task) => {
    const token = sessionStorage.getItem("token") || null;
    const user = {
      token,
      email: this.state.user.email,
      title: task,
      status: "active",
    };
    axios
      .post("http://localhost:5000/todo/addTodo", { user })
      .then((response) => {
        const { data, status } = response;
        if (data.success && status / 100 === 2) {
          this.loadTodo();
        }
        if (!status / 100 === 2) {
          alert("check the console");
          console.log(data.msg);
        }
      })
      .catch((err) => {
        console.log("error : ", err);
        alert("check the console");
        console.log(err);
      });
  };

  removeTask = async (todoId) => {
    const token = sessionStorage.getItem("token") || null;
    const user = {
      token,
      todoId,
      email: this.state.user.email,
      deleted: true,
    };
    axios
      .post("http://localhost:5000/todo/deleteTodo", { user })
      .then((response) => {
        const { data, status } = response;
        if (data.success && status / 100 === 2) {
          this.loadTodo();
        }
        if (!status / 100 === 2) {
          alert("check the console");
          console.log(data.msg);
        }
      })
      .catch((err) => {
        console.log("error : ", err);
        alert("check the console");
        console.log(err);
      });
  };

  doneTask = async (todoId) => {
    let newStatus;
    this.state.tasks.map((todo) => {
      if (todo.todoId === todoId) {
        newStatus = todo.todoStatus === "active" ? "passive" : "active";
      }
    });
    const token = sessionStorage.getItem("token") || null;
    const user = {
      token,
      todoId,
      email: this.state.user.email,
      status: newStatus,
    };
    axios
      .post("http://localhost:5000/todo/updateTodo", { user })
      .then((response) => {
        const { data, status } = response;
        if (data.success && status / 100 === 2) {
          this.loadTodo();
        }
        if (!status / 100 === 2) {
          alert("check the console");
          console.log(data.msg);
        }
      })
      .catch((err) => {
        console.log("error : ", err);
        alert("check the console");
        console.log(err);
      });
  };

  render() {
    const { isSignedIn, route } = this.state;
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
