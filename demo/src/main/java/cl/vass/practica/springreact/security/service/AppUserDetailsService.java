package cl.vass.practica.springreact.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import cl.vass.practica.springreact.model.User;
import cl.vass.practica.springreact.repository.UserRepository;
import cl.vass.practica.springreact.security.model.AppUserDetails;

@Service
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(userName);

        if(user==null){
            throw new UsernameNotFoundException("Usuario no encontrado: "+userName);
        }
        
        return new AppUserDetails(user);
    }


}