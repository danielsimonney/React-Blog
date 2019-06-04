import React, {Component} from "react";
import GetUser from "../services/api";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      lastLogin: "",
      created: ""
    };
  }

  componentDidMount() {
    console.log("t nul");
    var token = sessionStorage.getItem("token");
    GetUser.GetUser(token).then(json => {
      this.setState({firstname: json.data.firstname, lastname: json.data.lastname, lastLogin: json.data.last_login, created: json.data.created_at});
    });
  }

  render() {
    return (<div className="container">
      <div className="col">
        <h1>
          This user is{" "}
          {this.state.firstname + " " + this.state.lastname + " "}
        </h1>
        <h2>
          Il s'est connecté la dernière fois le{" "}
          {this.state.lastLogin + " et il a créé son compte le " + this.state.created}
        </h2>
      </div>
    </div>);
  }
}