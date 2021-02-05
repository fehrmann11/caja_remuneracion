import React, {Component} from 'react'
import LoginComponent from './login/LoginComponent'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import WelcomeComponent from './welcome/WelcomeComponent';
import HeaderComponent from './Header/HeaderComponent';
import FooterComponent  from './footer/FooterComponent';
import InitialScreen from './initial/InitialScreen';
import AuthenticatedRoute from './Authentication/AuthenticatedRoute';
import ErrorComponent from './Error404/ErrorComponent';
import EnterprisesComponent from './EnterprisesManagement/EnterprisesComponent';

class RemunCarg extends Component{
    render(){
        return(
            <div className="RemunCarg">
                <Router>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={InitialScreen}/>
                        <Route path="/login" exact component={LoginComponent}/>
                        <AuthenticatedRoute path="/management" component={WelcomeComponent}/>
                        <AuthenticatedRoute path="/enterprisesManagement" component={EnterprisesComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                </Router>
       
            </div>
        )
    }
}

export default RemunCarg;