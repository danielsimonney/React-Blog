import React, {Component} from "react";
import UpdatePassword from "../services/api";
import {Redirect} from "react-router";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      lastPassword: "",
      password: "",
      passwordVerif: ""
    };
  }

  handleLastPassword(text) {
    this.setState({lastPassword: text.target.value});
  }
  handlePassword(text) {
    this.setState({password: text.target.value});
  }

  handlePasswordVerif(text) {
    this.setState({passwordVerif: text.target.value});
    console.log(this.state.birthdate);
  }
  handleSubmit = e => {
    e.preventDefault();

    var lastPassword = this.state.lastPassword;
    var password = this.state.password;
    var passwordVerif = this.state.passwordVerif;
    var data = {
      password_old: `${lastPassword}`,
      password_new: `${password}`,
      password_new_verif: `${passwordVerif}`
    };
    var token = sessionStorage.getItem("token");
    UpdatePassword.UpdatePassword(data, token).then(json => {
      sessionStorage.setItem("alert", "PasswordUpdateSuccesfully");
      this.setState({redirect: true});
      window.location.reload();
    }).catch(function (error) {
      console.log("et merde");
      alert(error);
    });
  };

  render() {
    if (this.state.redirect) {
      return (<div>
        <Redirect to="/"/> {this.setState({redirect: false})}{" "}
      </div>);
    }
    return (<div className="container">
      <form onSubmit={this.handleSubmit}>
        <h1>
          Change your password
        </h1>{" "}
        <input type="text" placeholder="enter last password" onChange={text => {
            this.handleLastPassword(text);
          }}/>{" "}
        <br/>
        <input type="password" placeholder="enter password" onChange={text => {
            this.handlePassword(text);
          }}/>{" "}
        <input type="password" placeholder=" password verification" onChange={text => {
            this.handlePasswordVerif(text);
          }}/>{" "}
        <br/>
        <input type="submit" value="Submit"/>
      </form>{" "}
    </div>);
  }
}
