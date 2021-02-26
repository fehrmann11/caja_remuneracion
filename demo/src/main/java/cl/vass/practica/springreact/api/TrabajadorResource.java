package cl.vass.practica.springreact.api;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

   //Buscar a trabajador por rut y nombre
   // Busca a los empleadores por rut y razonSocial
   @PreAuthorize("hasAnyAuthority('ADMIN','BACKOFFICE','NEGOCIO')")
   @GetMapping(value="/busqueda", produces = MediaType.APPLICATION_JSON_VALUE)
   public List<Trabajador> getData(@RequestParam(required = false,name = "idRut") String idRut,
                                   @RequestParam(value = "name",required = false) String name){
       HashMap<String, Object> data = new HashMap<>();

       if (idRut!=null)
           data.put("rut",idRut);
       if(name!=null)
           data.put("apellidoPaterno",name);
       return trabajadorRepository.getData(data);
   }

   //Busca los empleadores de un trabajador por id (rut)
   @PreAuthorize("hasAnyAuthority('ADMIN','BACKOFFICE','NEGOCIO')")
   @GetMapping("/{id}/empleador")
   public ResponseEntity getEmpleadorByTrabajador(@PathVariable("id") String id){
       try{
           Optional<Trabajador> optTrabajador = trabajadorRepository.findById(id);
           if(optTrabajador.isPresent()){
               return ResponseEntity.status(HttpStatus.OK).body(optTrabajador.get().getEmpleadores());
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

    //bucar trabajador por rut
    @PreAuthorize("hasAnyAuthority('ADMIN','BACKOFFICE','NEGOCIO')")
    @GetMapping("/{id}")
    public ResponseEntity getTrabajadorByRut(@PathVariable("id") String id){
        try{
            Optional<Trabajador> optTrabajador = trabajadorRepository.findById(id);
            if(optTrabajador.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(optTrabajador.get());
            }else{
                ErrorResponse response = new ErrorResponse("Empleador no encontrado",null);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        }catch(Exception e){
            ErrorResponse response = new ErrorResponse("Error al recuperar empleador",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }


    /*como pido */

}
