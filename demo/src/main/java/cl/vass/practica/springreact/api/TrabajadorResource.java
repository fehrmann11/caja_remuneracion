package cl.vass.practica.springreact.api;


import cl.vass.practica.springreact.model.*;
import cl.vass.practica.springreact.model.response.ErrorResponse;
import cl.vass.practica.springreact.model.response.TrabajadorResponse;
import cl.vass.practica.springreact.repository.TrabajadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/private/trabajador")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TrabajadorResource {

    @Autowired
    TrabajadorRepository trabajadorRepository;


//Get de trabajadores
    @PreAuthorize("hasAnyAuthority('ADMIN','BACKOFFICE','NEGOCIO')")
    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getTrabajadores(){
        try{
            List<Trabajador> trabajadores = trabajadorRepository.findAll();
            List<TrabajadorResponse> trabajadorResponse = trabajadores
                    .stream()
                    .map(t -> new TrabajadorResponse(
                            t.getRut(),
                            t.getNombres(),
                            t.getApellidoPaterno(),
                            t.getApellidoMaterno(),
                            t.getTelefono(),
                            t.getCelular(),
                            t.getEmail(),
                            t.getDireccion(),
                            t.getTramo()))
                    .collect(Collectors.toList());
            return  ResponseEntity.ok(trabajadorResponse);


        }catch (Exception e){
            ErrorResponse response = new ErrorResponse("Error al recuperar trabajadores",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    
}
