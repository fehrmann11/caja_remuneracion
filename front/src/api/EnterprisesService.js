import axios from 'axios'
import AuthenticationService from '../components/Authentication/AuthenticationService';
import SecurityService from './SecurityService';

class EnterprisesService{
     //Retorna los usuarios de cualquier servicio (Lunes cambiar nombre)
     returnGet(ruta){
        if(AuthenticationService.isTokenActive()===''){
            return axios.get(`http://localhost:8080${ruta}`)
        }else{
            let token = AuthenticationService.isTokenActive();
            SecurityService.setupAxiosInterceptors('Bearer '+ token)
            return axios.get(`http://localhost:8080${ruta}`)
        }
    }

    delete(ruta){
        if(AuthenticationService.isTokenActive()===''){
            return axios.delete(`http://localhost:8080${ruta}`)
        }else{
            let token = AuthenticationService.isTokenActive();
            SecurityService.setupAxiosInterceptors('Bearer '+ token)
            return axios.delete(`http://localhost:8080${ruta}`)
        }
    }
    update(ruta){
        if(AuthenticationService.isTokenActive()===''){
            return axios.update(`http://localhost:8080${ruta}`)
        }else{
            let token = AuthenticationService.isTokenActive();
            SecurityService.setupAxiosInterceptors('Bearer '+ token)
            return axios.update(`http://localhost:8080${ruta}`)
        }
    }

    
}

export default new EnterprisesService();