import { useState } from 'react';
import './LoginComponent.css'
import SecurityService from '../../api/SecurityService'
import {useHistory } from 'react-router-dom';


const LoginComponent = () => {
    const [userName, setUserName] = useState("ingrese su usuario");
    const [password, setPassword] = useState("ingrese su contraseña");
    const [hasLoginFailed, setHasLoginFailed] = useState(false);
    let history = useHistory();


    /*Está función se lanza al momento de dar clic en el botón la cual hace una promesa
    a través de SecurityService y obtiene un token, una vez obtenido el token se va a
    la pantalla management (que es welcomeComponent)*/
    const loginClicked = () => {
        SecurityService.AuthenticationService(userName, password)
            .then((response) => {
                SecurityService.registerSuccessfulLoginForJwt(userName, response.data.jwt)
                history.push(`/management`)
            }).catch(() => {
                setHasLoginFailed(true);
            })
    }

    //Esta función guarda el usuario y contraseña en las variables userName y password
    const handleChangeUsername = (event) => {
        console.log(userName)
        setUserName(event.target.value);
    }

    const handleChangePassword = (event) =>{
        console.log(password)
        setPassword(event.target.value)
    }

    //Formulario
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
                        placeholder={userName}
                        onChange={handleChangeUsername} />

                    <input type="password"
                        id="password"
                        className="fadeIn third"
                        name="password"
                        placeholder={password}
                        onChange={handleChangePassword} />

                    <button className="btn btn-primary" onClick={loginClicked}>iniciar sesión</button>

                </div>
                {hasLoginFailed && <div className="alert alert-warning" role="alert">
                    Tu usuario o contraseña son inválidos
                </div>}


            </div>
        </div>
    )


}

export default LoginComponent;