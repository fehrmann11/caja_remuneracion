package cl.vass.practica.springreact.api;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import cl.vass.practica.springreact.model.response.UserResponse;
import cl.vass.practica.springreact.repository.UserRepository;
import cl.vass.practica.springreact.security.service.AppUserDetailsService;
import cl.vass.practica.springreact.model.Role;
import cl.vass.practica.springreact.model.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/private/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserResource {
    
    @Autowired
    private AppUserDetailsService userDetailsService;

    @Autowired
    UserRepository userRepository;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserResponse> getUser(@PathVariable String id) throws UsernameNotFoundException{
        UserDetails userDetails = userDetailsService.loadUserByUsername(id);
        if(userDetails == null)
            throw new UsernameNotFoundException("Usuario no encontrado");
        
        List<String> roles = userDetails.getAuthorities()
            .stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());

        return ResponseEntity.ok(new UserResponse(id, roles));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserResponse>> getUsers(){
        List<User> users = userRepository.findAll();
        List<UserResponse> usersR = users
            .stream()
            .map(u -> new UserResponse(
                u.getUserName(), 
                u.getRoles()
                    .stream()
                    .map(Role::getName).collect(Collectors.toList())))
            .collect(Collectors.toList());
        return ResponseEntity.ok(usersR);
    }
}
