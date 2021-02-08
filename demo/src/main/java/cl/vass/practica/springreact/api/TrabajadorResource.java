package cl.vass.practica.springreact.api;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

import cl.vass.practica.springreact.model.Trabajador;
import cl.vass.practica.springreact.model.response.ErrorResponse;
import cl.vass.practica.springreact.model.response.TrabajadorResponse;
import cl.vass.practica.springreact.repository.TrabajadorRepository;

@RestController
@RequestMapping("/private/trabajador")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TrabajadorResource {

    @Autowired
    TrabajadorRepository trabajadorRepository;

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
