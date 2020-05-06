import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import axios from "axios";
// import Chat from "./chat";

class Login extends Component {
  //   const [submitBol, setsubmitBol] = useState(false);
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    const user = {
      email,
      password,
    };
    axios
      .post(`http://localhost:5000/user/login`, {
        user,
      })
      .then((response) => {
        const { data, status } = response;
        if (data.success && status / 100 === 2) {
          alert("login successfull");
          sessionStorage.setItem("token", data.msg);
          this.props.loadUser(email);
          this.props.onRouteChange("todos");
        }
        if (!status / 100 === 2) {
          alert("login failed");
          this.setState({ email: "" });
          this.setState({ password: "" });
        }
      })
      .catch((err) => {
        console.log("error : ", err);
        alert("login failed");
        this.setState({ email: "" });
        this.setState({ password: "" });
      });
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { onRouteChange } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <br></br>
          <FormGroup controlId="email">
            Email
            <FormControl
              autoFocus
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
            Password
            <FormControl
              value={this.state.password}
              type="password"
              name="password"
              onChange={this.onChange}
            />
          </FormGroup>
          <Button disabled={!this.validateForm()} type="submit">
            Login
          </Button>
          <br></br>
        </form>
        {/* <button onClick={onRouteChange("register")}>signup</button> */}
        {/* {submitBol && <Chat email={email} />} */}
      </div>
    );
  }
}
export default Login;
