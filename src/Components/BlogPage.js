import React, {Component} from "react";
import GetPage from "../services/api";
import {Redirect} from "react-router";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      author: "",
      content: "",
      creationDate: "",
      redirect: false
    };
  }
  componentDidMount() {
    var nb = this.props.match.params.id;
    GetPage.GetMyPage(nb).then(json => {
      this.setState({title: json.data.title, author: json.data.User.firstname, content: json.data.content, creationDate: json.data.created_at});
      console.log(this.state.content);
    });
  }

  render() {
    return (<div className="container">
      <h1>{this.state.title}</h1>
      <h2>
        un article de{" "}
        {this.state.author + " créé le " + this.state.creationDate}
      </h2>
      <h3>Contenu</h3>
      <p className="content">{this.state.content}</p>
      <Link to="/GetArticles/">Retournez en arrière</Link>
    </div>);
  }
}
