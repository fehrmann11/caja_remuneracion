import React, { Component } from 'react';
import './LoginComponent.css'
import SecurityService from '../../api/SecurityService'



class LoginComponent extends Component {

    //inicialización de variables
    constructor(props) {
        super(props)
        this.state = {
            userName: "ingrese su usuario",
            password: "ingrese su contraseña",
            hasLoginFailed: false
        }

        //bindeo de las funciones
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)

    }

    /*Está función se lanza al momento de dar clic en el botón la cual hace una promesa
    a través de SecurityService y obtiene un token*/
    loginClicked() {
       SecurityService.AuthenticationService(this.state.userName,this.state.password)
            .then((response)=>{
            SecurityService.registerSuccessfulLoginForJwt(this.state.userName,response.data.jwt)
            this.props.history.push(`/management`)
        }).catch(()=>{
            console.log("falso")
        })
    }


    //Esta función guarda el usuario y contraseña en las variables userName y password
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value 
        })

    }



    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    {/*icono de la empresa */}
                    <div className="fadeIn first">
                        <img src="https://ii.ct-stc.com/4/logos/empresas/2018/02/07/vass-chile-CCFC14226ACF2C23151119258thumbnail.jpg"
                            alt="logo"
                            id="icon" />
                    </div>
                    {/*Formulario */}
                    <div >

                        <input type="text"
                            id="login"
                            className="fadeIn second"
                            name="userName"
                            placeholder={this.state.userName}
                            onChange={this.handleChange} />

                        <input type="password"
                            id="password"
                            className="fadeIn third"
                            name="password"
                            placeholder={this.state.password}
                            onChange={this.handleChange} />

                        <button className="btn btn-primary" onClick={this.loginClicked}>iniciar sesión</button>

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