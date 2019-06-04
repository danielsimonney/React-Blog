import React, {Component} from "react";
import getArticles from "../services/api";
import ListArticlesAccueil from "./ListArticlesAccueil";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    console.log("t nul");
    getArticles.getArticle().then(json => {
      var articleArray = [];
      var myData = json.data;
      myData.reverse();
      var LastId = myData[0].id;

      for (var i = 0; i < 10; i++) {
        articleArray.push(myData[i]);
      }
      console.log(articleArray);
      this.setState({articles: articleArray});
      console.log(this.state.articles);
      console.log("on est la");
    });
  }
  render() {
    console.log(this.state.articles);
    return (<div className="container">
      <h1>Welcome to my blog app</h1>
      <h2>Here are the last articles</h2>
      <div>
        {
          this.state.articles.map(article => {
            return (<ListArticlesAccueil className="articleAccueil" id={article.id} title={article.title} author={article.User.firstname}/>);
          })
        }{" "}
      </div>
    </div>);
  }
}
export default App;