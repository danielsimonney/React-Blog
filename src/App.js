import React, {Component} from "react";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import Routing from "./Components/Router";

import "font-awesome/css/font-awesome.min.css";
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStroopwafel} from "@fortawesome/free-solid-svg-icons";
class App extends Component {
  render() {
    return (<div>
      <Routing/>
    </div>);
  }

}
export default App;
