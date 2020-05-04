import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";

import axios from "axios";

class Signup extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  };

  handleSubmit = async (event) => {
    const { email, username, password } = this.state;
    event.preventDefault();
    const user = {
      email,
      username,
      password,
    };
    try {
      const response = await axios.post(`http://localhost:5000/user/addUser`, {
        user,
      });
      const { data, status } = response;
      if (data.success && status / 100 === 2) {
        alert("successfully signedUp");
        this.props.loadUser(email);
        this.props.onRouteChange("todos");
      } else {
        alert("signup failed");
      }
      this.setState({ email: "" });
      this.setState({ username: "" });
      this.setState({ password: "" });
      this.setState({ confirmPassword: "" });
    } catch (err) {
      console.log("error : ", err);
      alert("signup failed");
    }
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { email, username, password, confirmPassword } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <br></br>
        <FormGroup controlId="username">
          Name
          <FormControl
            autoFocus
            type="text"
            name="username"
            value={username}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup controlId="email">
          Email
          <FormControl
            autoFocus
            type="email"
            name="email"
            value={email}
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup controlId="password">
          Password
          <FormControl
            value={password}
            type="password"
            name="password"
            onChange={this.onChange}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          confirm Password
          <FormControl
            value={confirmPassword}
            type="password"
            name="confirmPassword"
            onChange={this.onChange}
          />
        </FormGroup>
        <Button disabled={!this.validateForm()} type="submit">
          Signup
        </Button>
      </form>

      // <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
      //   <input
      //     type="text"
      //     name="title"
      //     style={{ flex: '10', padding: '5px' }}
      //     placeholder="Add Todo ..."
      //     value={this.state.title}
      //     onChange={this.onChange}
      //   />
      //   <input
      //     type="submit"
      //     value="Submit"
      //     className="btn"
      //     style={{flex: '1'}}
      //   />
      // </form>
    );
  }
}

export default Signup;
