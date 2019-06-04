import React, {Component} from "react";
import {Redirect} from "react-router";

export default class listArticles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      page: 0
    };
  }
  gotoPage(Monid) {
    this.setState({page: Monid});
    this.setState({redirect: true});
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={"/blogpage/" + this.state.page}/>;
    }
    console.log("zaza");
    return (<div className="articleAccueil">
      {" "}
      <div id={this.props.id} className="articlePres">
        {" "}
        Voici mon article, {this.props.title},{" "}
        <span>de l 'auteur {this.props.author}</span>{" "}
      </div>{" "}
      <div id={this.props.id} onClick={() => {
          this.gotoPage(this.props.id);
        }}>
        {" "}
        <div className="link">Read more</div>
      </div>{" "}
    </div>);
  }
}
