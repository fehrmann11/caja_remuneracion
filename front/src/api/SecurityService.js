import axios from 'axios'
class SecurityService{

    /*Función encargada de retornar un token y hacer la conexión a la base de datos */
    AuthenticationService(userName,password){
        console.log(userName,password)
        const headers = {
            'Content-Type': 'application/json'
        }
        return axios.post('http://localhost:8080/authenticate',{
            userName,password
        },{headers:headers})
    }
    //registra el usuario en sessionStorage y crea un token
    registerSuccessfulLoginForJwt(username,token){
        sessionStorage.setItem('authenticatedUser',username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
        
    }
    //ve si está logeado
    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null) return false
        return true
    }

    setupAxiosInterceptors(token){
        axios.interceptors.request.use(
            (config) =>{
                if(this.isUserLoggedIn()){
                    config.headers.authorizaton = token
                }
                return config
            }
        )
    }

    createJWTToken(token){
        return 'Bearer' + token
    }

}

export default new SecurityService();