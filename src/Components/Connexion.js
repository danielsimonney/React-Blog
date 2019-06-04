import React, {Component} from "react";
import login from "../services/api";
import {Redirect} from "react-router";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirect: false
    };
  }

  handleEmail(text) {
    this.setState({email: text.target.value});
  }
  handlePassword(text) {
    this.setState({password: text.target.value});
  }

  login() {
    var data = {
      email: `${this.state.email}`,
      password: `${this.state.password}`
    };
    login.connexion(data).then(json => {
      console.log(json.data.token);
      sessionStorage.setItem("token", json.data.token);
      this.setState({redirect: true});
      window.location.reload();
      console.log(this.state.redirect);
    }).catch(function (error) {
      alert(error);
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/"/>;
    }
    return (<div className="Login">
      <div className="container">
        <h1>Login</h1>{" "}
        <input type="text" placeholder="enter email" onChange={text => {
            this.handleEmail(text);
          }}/>{" "}
        <br/>
        <input type="password" placeholder="enter password" onChange={text => {
            this.handlePassword(text);
          }}/>{" "}
        <br/>
        <button onClick={() => {
            this.login();
          }}>
          {" "}
          Login{" "}
        </button>{" "}
      </div>
    </div>);
  }
}