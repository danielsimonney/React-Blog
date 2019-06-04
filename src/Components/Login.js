import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, {Component} from 'react'
import Log from '../services/api'

export default class Login extends Component{
    render(){
        return(
            <div>
        <div>
            <Link to="/newConnection/">Nouvel utilisateur</Link>
            </div>
            <div>
            <Link to="/Connexion/">Se connecter</Link>
            </div>
            <div>
                <Link to="/articles/">voir les articles </Link>
            </div>
            </div>
            )
    
    
    }
        
        
        }