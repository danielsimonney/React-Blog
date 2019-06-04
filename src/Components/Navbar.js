import {BrowserRouter as NavLink, Link} from "react-router-dom";
import React, {Component} from "react";
import Log from "../services/api";
import {Redirect} from "react-router";
import SweetAlert from "react-bootstrap-sweetalert";
import Alert from "./Alert";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: false,
      redirect: false
    };
  }

  componentDidMount() {
    if (this.props.isLogged === true) {
      this.setState({logged: true});
    }
    console.log(this.props.isLogged);
    console.log("hourra");
    if (sessionStorage.getItem("token") !== null) {
      console.log(sessionStorage.getItem("token"));
      this.setState({logged: true});
    }
  }
  //setAlert me set à définir si il ya une alert dans ma session et si oui à appeler la bonne fonction du fichier d'alertes

  handledeconnexion() {
    sessionStorage.removeItem("token");
    this.setState({logged: false});
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect) {
      return (<div>
        <Redirect to="/"/> {this.setState({redirect: false})}{" "}
      </div>);
    }
    if (this.state.logged === false) {
      return (<div className="navbar">
        <div className="content">
          <ul id="menu">
            <li>
              {" "}
              <a href="#">Se connecter</a>
              <ul className="subs">
                <li>
                  {" "}
                  <Link to="/NewUser/">create account</Link>
                </li>

                <li>
                  {" "}
                  <Link to="/Connexion/">Connexion</Link>
                </li>
              </ul>
            </li>

            <li>
              {" "}
              <Link to="/GetArticles/">See the articles</Link>
            </li>
            <li>
              {" "}
              <Link to="/">accueil</Link>
            </li>
            <li>
              {" "}
              <Link to="/GetWeather/">See the weather</Link>
            </li>
          </ul>
          <Alert/>
        </div>{" "}
      </div>);
    } else {
      return (<div className="navbar">
        <div className="content">
          <ul id="menu">
            <li onClick={() => {
                this.handledeconnexion();
              }}>
              {" "}
              <a>se déconnecter</a>
            </li>
            <li>
              {" "}
              <Link to="/">accueil</Link>
            </li>
            <li>
              {" "}
              <a href="#">Articles</a>
              <ul className="subs">
                <li>
                  {" "}
                  <Link to="/GetArticles">See the articles</Link>
                </li>

                <li>
                  {" "}
                  <Link to="/PostArticles/">Post an article</Link>
                </li>
              </ul>
            </li>{" "}
            <li>
              {" "}
              <a href="#">My account</a>
              <ul className="subs">
                <li>
                  {" "}
                  <Link to="/GetMyInfo/">
                    {" "}
                    Get My personnal informations{" "}
                  </Link>
                </li>

                <li>
                  {" "}
                  <Link to="/UpdateUser/">update my user account</Link>
                </li>

                <li>
                  {" "}
                  <Link to="/UpdatePassword/">update my user password</Link>
                  <Alert/>
                </li>
              </ul>
            </li>
            <li>
              {" "}
              <Link to="/GetWeather/">See the weather</Link>
            </li>
          </ul>
        </div>{" "}
      </div>);
    }
  }
}
