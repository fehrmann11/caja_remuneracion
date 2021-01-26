package cl.vass.practica.springreact.model;

import java.util.List;

public class UserResponse {
    private final String userName;
    private final List<String> roles;

    public UserResponse(String userName, List<String> roles) {
        this.userName = userName;
        this.roles = roles;
    }

    public String getUserName() {
        return userName;
    }

    public List<String> getRoles() {
        return roles;
    }
    
}
