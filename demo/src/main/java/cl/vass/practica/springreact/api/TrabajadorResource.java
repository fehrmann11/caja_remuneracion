package cl.vass.practica.springreact.api;


import cl.vass.practica.springreact.model.*;
import cl.vass.practica.springreact.repository.TrabajadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/private/trabajador")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TrabajadorResource {

    @Autowired
    TrabajadorRepository trabajadorRepository;


    //@PreAuthorize("hasAnyAuthority('ADMIN','BACKOFFICE','NEGOCIO')")
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TrabajadorResponse>> getTrabajadores(){//nombre completo
        List<Trabajador> trabajadores = trabajadorRepository.findAll();
        

        //rellenar la lista con trabajadores...(nombres apellido paterno rut ..)
        List<TrabajadorResponse> trabajadorResponse = new LinkedList<TrabajadorResponse>() ;
        TrabajadorResponse tr;
        String nombre;
        for (int i=0;i<trabajadores.size();i++){
               nombre = trabajadores.get(i).getNombres(); //getNombre??
               tr = new TrabajadorResponse();
               tr.setNombre(nombre);
               trabajadorResponse.add(tr);
            }
       return ResponseEntity.ok(trabajadorResponse);
   }
    
}
