class AuthenticationService{
    registerSuccessfulLogin(username){
        sessionStorage.setItem('authenticatedUser',username);
    }
}

export default new AuthenticationService();