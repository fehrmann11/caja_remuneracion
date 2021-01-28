package cl.vass.practica.springreact.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import cl.vass.practica.springreact.security.model.AuthenticationRequest;
import cl.vass.practica.springreact.security.model.AuthenticationResponse;
import cl.vass.practica.springreact.security.service.AppUserDetailsService;
import cl.vass.practica.springreact.security.util.JwtUtil;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SecurityResource {

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private AppUserDetailsService userDetailsService;
    
    @Autowired
	private JwtUtil jwtTokenUtil;

    @PostMapping(value = "/authenticate")
	public ResponseEntity<AuthenticationResponse> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws AuthenticationException {
        try{
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authenticationRequest.getUserName(), authenticationRequest.getPassword())
			);
		}catch (BadCredentialsException e) {
			throw new BadCredentialsException("Usuario o contraseña incorrectos", e);
		}

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUserName());

		final String jwt = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new AuthenticationResponse(jwt));
	}
}
