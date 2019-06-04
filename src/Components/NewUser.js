import React, {Component} from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import createUser from "../services/api";
import {Redirect} from "react-router";
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({
  formErrors,
  ...rest
}) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      passwordVerif: null,
      redirect: false,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordVerif: ""
      }
    };
  }

  create(name, last, email, password, password_verif) {
    var MyData = `{${name},${last},${email},${password},${password_verif}}`;
    console.log(MyData);
    createUser.newUser(MyData).then(json => {
      console.log(json);
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      var name = `"firstname":"${this.state.firstName}"`;
      var last = `"lastname":"${this.state.lastName}"`;
      var email = `"email":"${this.state.email}"`;
      var password = `"password":"${this.state.password}"`;
      var password_verif = `"password_verif":"${this.state.passwordVerif}"`;
      this.create(name, last, email, password, password_verif);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const {name, value} = e.target;
    let formErrors = {
      ...this.state.formErrors
    };

    switch (name) {
      case "firstName":
        formErrors.firstName = value.length < 3
          ? "minimum 3 characaters required"
          : "";
        break;
      case "lastName":
        formErrors.lastName = value.length < 3
          ? "minimum 3 characaters required"
          : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password = value.length < 6
          ? "minimum 6 characaters required"
          : "";
        break;
      case "passwordVerif":
        formErrors.passwordVerif = value.length < 6
          ? "minimum 6 characaters required"
          : "";
        break;
      default:
        break;
    }

    this.setState({
      formErrors,
      [name]: value
    }, () => console.log(this.state));
  };

  render() {
    const {formErrors} = this.state;
    if (this.state.redirect) {
      return (<div>
        <Redirect to="/"/> {this.setState({redirect: false})}{" "}
      </div>);
    }
    return (<div className="wrapper">
      <div className="form-wrapper">
        <h1>Create Account</h1>
        <form onSubmit={this.handleSubmit} noValidate="noValidate">
          <div className="firstName">
            <label htmlFor="firstName">First Name</label>
            <input className={formErrors.firstName.length > 0
                ? "error"
                : null} placeholder="First Name" type="text" name="firstName" noValidate="noValidate" onChange={this.handleChange}/> {formErrors.firstName.length > 0 && (<span className="errorMessage">{formErrors.firstName}</span>)}
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Last Name</label>
            <input className={formErrors.lastName.length > 0
                ? "error"
                : null} placeholder="Last Name" type="text" name="lastName" noValidate="noValidate" onChange={this.handleChange}/> {formErrors.lastName.length > 0 && (<span className="errorMessage">{formErrors.lastName}</span>)}
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input className={formErrors.email.length > 0
                ? "error"
                : null} placeholder="Email" type="email" name="email" noValidate="noValidate" onChange={this.handleChange}/> {formErrors.email.length > 0 && (<span className="errorMessage">{formErrors.email}</span>)}
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input className={formErrors.password.length > 0
                ? "error"
                : null} placeholder="Password" type="password" name="password" noValidate="noValidate" onChange={this.handleChange}/> {formErrors.password.length > 0 && (<span className="errorMessage">{formErrors.password}</span>)}
          </div>
          <div className="passwordVerif">
            <label htmlFor="passwordVerif">Password Verification</label>
            <input className={formErrors.passwordVerif.length > 0
                ? "error"
                : null} placeholder="password Verif" type="password" name="passwordVerif" noValidate="noValidate" onChange={this.handleChange}/> {formErrors.passwordVerif.length > 0 && (<span className="errorMessage">{formErrors.passwordVerif}</span>)}
          </div>
          <div className="createAccount">
            <button type="submit">Create Account</button>
            <div>
              <Link to="/Connexion/">Already have an account ??</Link>
            </div>
          </div>
        </form>
      </div>
    </div>);
  }
}

export default App;