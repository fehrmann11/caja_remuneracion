package cl.vass.practica.springreact.api;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class HomeResource {

    @GetMapping(value="/")
    public String home() {
        return ("<h1>Welcome Home</h1>");
    }

    @GetMapping(value="/user")
    public String user() {
        return ("<h1>Welcome User</h1>");
    }

    @GetMapping(value="/admin")
    public String admin() {
        return ("<h1>Welcome Admin</h1>");
    }
    
}
