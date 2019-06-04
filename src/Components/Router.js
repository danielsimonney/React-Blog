import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Connexion from "./Connexion";
import NewUser from "./NewUser";
import GetArticles from "./ArticleTest";
import Accueil from "./Accueil";
import Navbar from "./Navbar";
import UpdatePassword from "./UpdatePassword";
import UserInfo from "./UserInfo";
import PostArticles from "./PostArticles";
import UpdateUser from "./UpdateUser";
import BlogPage from "./BlogPage";
import Weather from "./Weather";
export default class Routing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false
    };
    if (sessionStorage.getItem("token") !== null) {
      this.loggedIt();
    }
  }

  loggedIt() {
    this.setState({logged: true});
  }

  render() {
    return (<Router>
      <Route path={`/`} component={props => {
          return (<Navbar {...props} loggedIt={this.loggedIt.bind(this)} isLogged={this.state.logged}/>);
        }}/>

      <Route exact="exact" path={`/`} component={Accueil}/>

      <Route exact="exact" path={`/GetMyInfo`} component={UserInfo}/>

      <Route exact="exact" path={`/UpdateUser`} component={UpdateUser}/>

      <Route exact="exact" path={`/UpdatePassword`} component={UpdatePassword}/>

      <Route exact="exact" path={`/GetArticles`} component={GetArticles}/>

      <Route exact="exact" path={`/PostArticles`} component={PostArticles}/>

      <Route exact="exact" path={`/NewUser`} component={NewUser}/>

      <Route exact="exact" path={`/GetWeather`} component={Weather}/>

      <Route exact="exact" path={`/BlogPage/:id`} component={BlogPage}/>

      <Route path={`/connexion`} component={Connexion}/>
    </Router>);
  }
}

// <Route exact="exact" path={`/`} component={Accueil} />

// <Route exact="exact" path={`/GetMyInfo`} component={UserInfo}/>

// <Route exact="exact" path={`/UpdateUser`} component={UpdateUser}/>

// <Route exact="exact" path={`/UpdatePassword`} component={UpdatePassword}/>

// <Route exact="exact" path={`/GetArticles`} component={GetArticles}/>

// <Route exact="exact" path={`/PostArticles`} component={PostArticles}/>

// <Route exact="exact" path={`/NewUser`} component={NewUser}/>

// <Route exact="exact" path={`/GetWeather`} component={Weather}/>

// <Route exact="exact" path={`/BlogPage/:id`} component={BlogPage}/>

// <Route path={`/connexion`} component={Connexion}/>