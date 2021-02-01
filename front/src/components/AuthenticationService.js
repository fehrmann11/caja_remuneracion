class AuthenticationService{
    registerSuccessfulLogin(username){
        sessionStorage.setItem('authenticatedUser',username);
    }

    /*función para cerrar sesión (logout) */
    logout(){
        sessionStorage.removeItem('authenticatedUser');
    }

}

export default new AuthenticationService();