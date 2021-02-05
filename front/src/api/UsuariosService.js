import axios from 'axios'
import AuthenticationService from '../components/Authentication/AuthenticationService';
import SecurityService from './SecurityService';
class UsuariosService{

    //Retorna los usuarios
    retornaRolUsuario(){
        if(AuthenticationService.isTokenActive()===''){
            return axios.get('http://localhost:8080/private/users')
        }else{
            let token = AuthenticationService.isTokenActive();
            SecurityService.setupAxiosInterceptors('Bearer '+ token)
            return axios.get('http://localhost:8080/private/users')
        }
    }

    //put

    //delete
}

export default new UsuariosService();