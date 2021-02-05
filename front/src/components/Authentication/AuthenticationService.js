class AuthenticationService {
    registerSuccessfulLogin(username) {
        sessionStorage.setItem('authenticatedUser', username);
    }

    /*función para cerrar sesión (logout) */
    logout() {
        sessionStorage.removeItem('authenticatedUser');
        localStorage.removeItem('jwt');
    }

    /*Función para saber si está iniciada la sesión */
    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return false
        return true
    }

    //
    isTokenActive(){
        let token = localStorage.getItem('jwt')
        if (token === null) return ''
        return token
    }
}

export default new AuthenticationService();