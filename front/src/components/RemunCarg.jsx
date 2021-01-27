import React, {Component} from 'react'
import LoginComponent from './login/LoginComponent'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import WelcomeComponent from './welcome/WelcomeComponent';
import HeaderComponent from './Header/HeaderComponent';

class RemunCarg extends Component{
    render(){
        return(
            <div className="RemunCarg">
                <Router>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={LoginComponent}/>
                        <Route path="/welcome" component={WelcomeComponent}/>
                    </Switch>
                </Router>
       
            </div>
        )
    }
}

export default RemunCarg;