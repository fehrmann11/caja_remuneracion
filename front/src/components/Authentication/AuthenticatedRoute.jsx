import React from 'react';
import { Route, Redirect } from "react-router-dom";
import AuthenticationService from './AuthenticationService';

/* Esta clase pregunta si el usuario está logeado,
si lo está envia los props del router que se ejecutan en el 
componente TodoApp, sino redirecciona a login*/

const AuthenticatedRoute = ({ path,component }) => {

    if (AuthenticationService.isUserLoggedIn()) {
        console.log(path)
        return <Route paht={path} component={component} />
    } else {
        return <Redirect to="/login" />
    }

}



export default AuthenticatedRoute;