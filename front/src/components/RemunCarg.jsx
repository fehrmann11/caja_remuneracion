import React from 'react'
import LoginComponent from './login/LoginComponent'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import WelcomeComponent from './welcome/WelcomeComponent';
import HeaderComponent from './Header/HeaderComponent';
import FooterComponent  from './footer/FooterComponent';
import InitialScreen from './initial/InitialScreen';
import AuthenticatedRoute from './Authentication/AuthenticatedRoute';
import ErrorComponent from './Error404/ErrorComponent';
import EnterprisesComponent from './EnterprisesManagement/EnterprisesComponent';
import EnterprisesForm from './EnterprisesManagement/EnterprisesForm';
import Test from './test';
import WorkerComponent from './Worker/WorkerComponent';
import WorkerForm from './Worker/WorkerForm';
import RemunerationComponent from './remuneration/RemunerationComponent';
import RemunerationForm from './remuneration/RemunerationForm';


const RemunCarg = () => {


    return(
        
        <div className="RemunCarg">
            <Router>
                <HeaderComponent/>
                <Switch>
                    <Route path="/" exact component={InitialScreen}/>
                    <Route path="/test" exact component={Test}/>
                    <Route path="/login" exact component={LoginComponent}/>
                    <AuthenticatedRoute path="/management" component={WelcomeComponent}/>
                    <AuthenticatedRoute path="/enterprisesManagement/:id" component={EnterprisesForm}/>
                    <AuthenticatedRoute path="/enterprisesManagement" component={EnterprisesComponent}/>
                    <AuthenticatedRoute path="/workerManagement/:id" component={WorkerForm}/>
                    <AuthenticatedRoute path="/workerManagement" component={WorkerComponent}/>
                    <AuthenticatedRoute path="/remuneration/:rut/:rutEmpleador/:rutCarga/:periodo" component={RemunerationForm}/>
                    <AuthenticatedRoute path="/remuneration" component={RemunerationComponent}/>
                    <Route component={ErrorComponent}/>
                </Switch>
                <FooterComponent/>
            </Router>
   
        </div>
       
    )
}



export default RemunCarg;