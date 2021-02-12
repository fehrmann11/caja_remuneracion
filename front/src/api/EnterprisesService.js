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
    update(ruta,cuerpo){
        if(AuthenticationService.isTokenActive()===''){
            return axios.put(`http://localhost:8080${ruta}`,cuerpo)
        }else{
            let token = AuthenticationService.isTokenActive();
            SecurityService.setupAxiosInterceptors('Bearer '+ token)
            return axios.put(`http://localhost:8080${ruta}`,cuerpo)
        }
    }

    create(ruta,cuerpo){
        if(AuthenticationService.isTokenActive()===''){
            return axios.post(`http://localhost:8080${ruta}`,cuerpo)
        }else{
            let token = AuthenticationService.isTokenActive();
            SecurityService.setupAxiosInterceptors('Bearer '+ token)
            return axios.post(`http://localhost:8080${ruta}`,cuerpo)
        }
    }

    
}

export default new EnterprisesService();