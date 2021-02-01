import React , {Component} from 'react';
import UsuariosService from '../../api/UsuariosService';

class WelcomeComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            welcomeMessage: ''
        }
        this.getRoles = this.getRoles.bind(this)
    }
    //boton
    getRoles(){
        UsuariosService.retornaRolUsuario()
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div><button className="btn btn-success" onClick={this.getRoles}>Obten tus roles</button></div>
        )
    }
}

export default WelcomeComponent;