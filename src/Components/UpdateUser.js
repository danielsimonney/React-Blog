import React, {Component} from "react";
import UpdateUser from "../services/api";
import {Redirect} from "react-router";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      firstname: "",
      lastname: "",
      birthdate: ""
    };
  }

  handleFirstname(text) {
    this.setState({firstname: text.target.value});
  }
  handleLastname(text) {
    this.setState({lastname: text.target.value});
  }

  handleBirthdate(text) {
    this.setState({birthdate: text.target.value});
    console.log(this.state.birthdate);
  }
  handleSubmit = e => {
    e.preventDefault();

    var firstname = this.state.firstname;
    var lastname = this.state.lastname;
    var birthdate = this.state.birthdate;
    var data = {
      firstname: `${firstname}`,
      lastname: `${lastname}`,
      birthdate: `${birthdate}`
    };
    var token = sessionStorage.getItem("token");
    UpdateUser.UpdateUser(data, token).then(json => {
      console.log(json.status);
      sessionStorage.setItem("alert", "UserUpdateSuccesfully");
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
        <h1>Change your username</h1>{" "}
        <input type="text" placeholder="enter firstname" onChange={text => {
            this.handleFirstname(text);
          }}/>{" "}
        <br/>
        <input type="text" placeholder="enter lastname" onChange={text => {
            this.handleLastname(text);
          }}/>{" "}
        <input type="date" placeholder="enter birthdate" onChange={text => {
            this.handleBirthdate(text);
          }}/>{" "}
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>);
  }
}