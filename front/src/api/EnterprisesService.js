import axios from 'axios'
import AuthenticationService from '../components/Authentication/AuthenticationService';
import SecurityService from './SecurityService';

class EnterprisesService{
     //Retorna los usuarios
     returnEnterprises(){
        if(AuthenticationService.isTokenActive()===''){
            return axios.get('http://localhost:8080/private/empleador')
        }else{
            let token = AuthenticationService.isTokenActive();
            SecurityService.setupAxiosInterceptors('Bearer '+ token)
            return axios.get('http://localhost:8080/private/empleador')
        }
    }
}

export default new EnterprisesService();