class AuthenticationService {
    registerSuccessfulLogin(username) {
        sessionStorage.setItem('authenticatedUser', username);
    }

    /*función para cerrar sesión (logout) */
    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    /*Función para saber si está iniciada la sesión */
    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return false
        return true
    }
}

export default new AuthenticationService();