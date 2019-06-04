import React, {Component} from "react";
import PostMessages from "../services/api";
import {Redirect} from "react-router";
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      title: "",
      content: "",
      category: "1"
    };
  }

  handleTitle(text) {
    this.setState({title: text.target.value});
  }
  handleContent(text) {
    this.setState({content: text.target.value});
  }

  handleCategory(event) {
    this.setState({category: event.target.value});
  }
  handleSubmit = e => {
    e.preventDefault();

    var title = this.state.title;
    var content = this.state.content;
    var category = this.state.category;
    var data = {
      title: `${title}`,
      content: `${content}`,
      article_category_id: `${category}`
    };
    var token = sessionStorage.getItem("token");
    PostMessages.Post(data, token).then(json => {
      console.log(json);
      console.log("salut ca va");
      sessionStorage.setItem("alert", "NewPost");

      this.setState({redirect: true});
      window.location.reload();

      console.log(json);
    }).catch(function (error) {
      alert(error);
    });
    console.log(title);
    console.log(content);
    console.log(category);
  };

  render() {
    if (this.state.redirect) {
      return (<div>
        <Redirect to="/"/> {this.setState({redirect: false})}{" "}
      </div>);
    }
    return (<div className="container">
      <form onSubmit={this.handleSubmit}>
        <h1>Post new article</h1>{" "}
        <input type="text" placeholder="enter title" onChange={text => {
            this.handleTitle(text);
          }}/>{" "}
        <br/>
        <input type="text" placeholder="enter content" onChange={text => {
            this.handleContent(text);
          }}/>{" "}
        <select value={this.state.value} onChange={text => {
            this.handleCategory(text);
          }}>
          <option value="1">Développement</option>
          <option value="2">Marketing</option>
          <option value="3">Design</option>
          <option value="4">Jeux vidéo</option>
          <option value="5">Sport</option>
          <option value="6">Musique</option>
          <option value="7">Autre</option>
        </select>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>);
  }
}