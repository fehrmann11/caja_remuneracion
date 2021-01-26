package cl.vass.practica.springreact.security.model;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import cl.vass.practica.springreact.model.User;

public class AppUserDetails implements UserDetails {

    private static final long serialVersionUID = 8703046378797131182L;
    
    private String username;
    private String password;
    private List<GrantedAuthority> authorities;

    public AppUserDetails(User user){
        this.username = user.getUserName();
        this.password = user.getPassword();
        this.authorities = user.getRoles()
            .stream()
            .map(r -> new SimpleGrantedAuthority(r.getName()))
            .collect(Collectors.toList());
    }

    public AppUserDetails(){

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
}
