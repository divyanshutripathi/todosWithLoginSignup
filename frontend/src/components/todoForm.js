import React, { Component } from "react";

export default class TodoForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
    };
  }

  addTask = (e) => {
    e.preventDefault();
    this.props.addTask(this.state.title);
    this.setState({ title: "" });
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.addTask} style={{ display: "flex" }}>
        <input
          type="text"
          name="title"
          style={{ flex: "10", padding: "5px" }}
          placeholder="Add Todo ..."
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{ flex: "1" }}
        />
      </form>
    );
  }
}
