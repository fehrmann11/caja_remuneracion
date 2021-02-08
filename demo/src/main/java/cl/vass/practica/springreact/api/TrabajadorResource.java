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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

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

   // Busca las cargas de un trabajador por id (rut)
   @PreAuthorize("hasAnyAuthority('ADMIN','BACKOFFICE','NEGOCIO')")
   @GetMapping("/{id}/cargas")
   public ResponseEntity getCargasByTrabajador(@PathVariable("id") String id){
       try{
           Optional<Trabajador> optTrabajador = trabajadorRepository.findById(id);
           if(optTrabajador.isPresent()){
               return ResponseEntity.status(HttpStatus.OK).body(optTrabajador.get().getCargas());
           }else{
               ErrorResponse response = new ErrorResponse("Trabajador no encontrado",null);
               return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
           }
       }catch(Exception e){
           ErrorResponse response = new ErrorResponse("Error al recuperar cargas del trabajador",e.getMessage());
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
       }
   }
    
}
