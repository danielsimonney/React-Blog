import SweetAlert from "react-bootstrap-sweetalert";
import React, {Component} from "react";
export default class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null
    };
  }
  componentDidMount() {
    this.myalert();
  }

  // fonction qui va gérer quel alert appeler en fonction de ce qu'il ya dans ma session d'alertes et qui va être une suite de conditions
  myalert() {
    if (sessionStorage.getItem("alert") === "UserUpdateSuccesfully") {
      this.UserUpdate();
    }
    if (sessionStorage.getItem("alert") === "PasswordUpdateSuccesfully") {
      this.PasswordUpdate();
    }
    if (sessionStorage.getItem("alert") === "NewPost") {
      this.ArticlePost();
    }
  }

  // hideAlert est appelé par les fonctions pour close les alertes au click du user
  hideAlert() {
    console.log("Hiding alert...");
    this.setState({alert: null});
    sessionStorage.removeItem("alert");
  }

  //   fonctions gérant l'affichage des alertes dans les différents cas
  UserUpdate() {
    const getAlert = () => (<SweetAlert success="success" title="Votre username a été modifié avec succès" onConfirm={() => this.hideAlert()}>
      Hello world!
    </SweetAlert>);

    this.setState({alert: getAlert()});
  }

  PasswordUpdate() {
    const getAlert = () => (<SweetAlert success="success" title="Votre password a été modifié avec succès" onConfirm={() => this.hideAlert()}>
      Hello world!
    </SweetAlert>);

    this.setState({alert: getAlert()});
  }

  ArticlePost() {
    console.log("in article post");
    const getAlert = () => (<SweetAlert success="success" title="votre article a bien été posté" onConfirm={() => this.hideAlert()}>
      Hello world!
    </SweetAlert>);

    this.setState({alert: getAlert()});
  }
  render() {
    return <div>{this.state.alert}</div>;
  }
}
