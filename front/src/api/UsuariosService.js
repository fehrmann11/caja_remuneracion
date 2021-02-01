import axios from 'axios'
class UsuariosService{

    retornaRolUsuario(){
        return axios.get('http://localhost:8080/private/users')
    }
}

export default new UsuariosService();