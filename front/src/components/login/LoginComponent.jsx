import React, { Component } from 'react';
import './LoginComponent.css'
import AuthenticationService from '../AuthenticationService'

class LoginComponent extends Component{

    //inicialización de variables
    constructor(props){
        super(props)
        this.state = {
            username:"ingrese su usuario",
            password:"ingrese su contraseña",
            hasLoginFailed: false
        }

        //bindeo de las funciones
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        
    }

    //Está función se lanza al momento de dar clic en el botón
    loginClicked(){
        if(this.state.username==="henry" && this.state.password==="123"){
            AuthenticationService.registerSuccessfulLogin(this.state.username);
        }
    }


    //Esta función guarda el usuario y contraseña en las variables username y password
    handleChange(event){
        this.setState({
             [event.target.name] :event.target.value
         })
         console.log(this.state.username,this.state.password)
        
    }


    
    render(){
        return(
            <div className="wrapper fadeInDown">
                <div id="formContent">  
                    {/*icono de la empresa */}
                    <div className="fadeIn first">
                        <img src="https://ii.ct-stc.com/4/logos/empresas/2018/02/07/vass-chile-CCFC14226ACF2C23151119258thumbnail.jpg"
                         alt="logo"
                         id="icon"/>
                    </div>
                    {/*Formulario */}
                    <div >

                        <input type="text" 
                        id="login" 
                        className="fadeIn second" 
                        name="username" 
                        placeholder={this.state.username}
                        onChange={this.handleChange}/>

                        <input type="text"
                        id="password"
                        className="fadeIn third"
                        name="password"
                        placeholder={this.state.username}
                        onChange={this.handleChange}/>

                        <button className="btn btn-primary"  onClick={this.loginClicked}>iniciar sesión</button>

                    </div>
                    {this.state.hasLoginFailed && <div className="alert alert-warning" role="alert">
                         Tu usuario o contraseña son inválidos
                    </div>}


                </div>
            </div>
        )
    }
}

export default LoginComponent;