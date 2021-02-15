import React from 'react';
import { Route, Redirect } from "react-router-dom";
import AuthenticationService from './AuthenticationService';

/* Esta clase pregunta si el usuario está logeado,
si lo está envia los props del router que se ejecutan en el 
componente TodoApp, sino redirecciona a login*/

const AuthenticatedRoute = () => {
    if(AuthenticationService.isUserLoggedIn()){
        return <Route {...this.props}/>
    }else{
        return <Redirect to="/login"/>
    }
}



export default AuthenticatedRoute;