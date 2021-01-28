import React, {Component} from 'react'
import LoginComponent from './login/LoginComponent'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import WelcomeComponent from './welcome/WelcomeComponent';
import HeaderComponent from './Header/HeaderComponent';
import FooterComponent  from './footer/FooterComponent';

class RemunCarg extends Component{
    render(){
        return(
            <div className="RemunCarg">
                <Router>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/login" exact component={LoginComponent}/>
                        <Route path="/welcome" component={WelcomeComponent}/>
                    </Switch>
                    <FooterComponent/>
                </Router>
       
            </div>
        )
    }
}

export default RemunCarg;