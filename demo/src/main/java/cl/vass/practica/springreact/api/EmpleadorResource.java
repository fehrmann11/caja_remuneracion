package cl.vass.practica.springreact.api;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import cl.vass.practica.springreact.model.Empleador;
import cl.vass.practica.springreact.model.Trabajador;
import cl.vass.practica.springreact.model.enums.TipoEmpleador;
import cl.vass.practica.springreact.model.request.EmpleadorRequest;
import cl.vass.practica.springreact.model.response.EmpleadorResponse;
import cl.vass.practica.springreact.model.response.ErrorResponse;
import cl.vass.practica.springreact.repository.EmpleadorRepository;
import cl.vass.practica.springreact.repository.TrabajadorRepository;
import cl.vass.practica.springreact.util.EnumUtils;

@RestController
@RequestMapping("/private/empleador")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EmpleadorResource {

    private Logger logger = LoggerFactory.getLogger(EmpleadorResource.class);

    @Autowired
    EmpleadorRepository empleadorRepository;

    @Autowired
    TrabajadorRepository trabajadorRepository;

    // Busca todos los empleadores
    @PreAuthorize("hasAnyAuthority('ADMIN','BACKOFFICE','NEGOCIO')")
    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getEmpleadores(){
        try{
            List<Empleador> empleadores = empleadorRepository.findAll();
            List<EmpleadorResponse> empleadoresResponse = empleadores
                .stream()
                .map(t -> new EmpleadorResponse(
                    t.getRut(), 
                    t.getRazonSocial(),
                    t.getTelefono(),
                    t.getCelular(),
                    t.getEmail(),
                    t.getDireccion(),
                    t.getTipoEmpleador()))
                .collect(Collectors.toList());
            return ResponseEntity.ok(empleadoresResponse);
        }catch(Exception e){
            ErrorResponse response = new ErrorResponse("Error al recuperar empleadores",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Busca a los empleadores por rut y razonSocial
    @PreAuthorize("hasAnyAuthority('ADMIN','BACKOFFICE','NEGOCIO')")
    @GetMapping(value="/busqueda", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Empleador> getData(@RequestParam(required = false,name = "idRut") String idRut,
                                   @RequestParam(value = "name",required = false) String name){
        HashMap<String, Object> data = new HashMap<>();

        if (idRut!=null)
            data.put("rut",idRut);
        if(name!=null)
            data.put("razonSocial",name);
        return empleadorRepository.getData(data);
    }

    // Busca empleador por id (rut)
    @PreAuthorize("hasAnyAuthority('ADMIN','BACKOFFICE','NEGOCIO')")
    @GetMapping("/{id}")
    public ResponseEntity getEmpleadorByRut(@PathVariable("id") String id){
        try{
            Optional<Empleador> optEmpleador = empleadorRepository.findById(id);
            if(optEmpleador.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(optEmpleador.get());
            }else{
                ErrorResponse response = new ErrorResponse("Empleador no encontrado",null);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        }catch(Exception e){
            ErrorResponse response = new ErrorResponse("Error al recuperar empleador",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Crea un nuevo empleador
    @PreAuthorize("hasAnyAuthority('BACKOFFICE')")
    @PostMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity addEmpleador(@RequestBody EmpleadorRequest empleadorRequest){
        try{
            final Function<String, TipoEmpleador> func = EnumUtils.lookupMap(TipoEmpleador.class, TipoEmpleador::getTipo);
            Empleador nuevoEmpleador = empleadorRepository
                .save(new Empleador(
                    empleadorRequest.getRut(), 
                    empleadorRequest.getRazonSocial(),
                    empleadorRequest.getTelefono(),
                    empleadorRequest.getCelular(),
                    empleadorRequest.getEmail(),
                    empleadorRequest.getDireccion(),
                    func.apply(empleadorRequest.getTipoEmpleador())));
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoEmpleador);
        }catch(Exception e){
            ErrorResponse response = new ErrorResponse("Error al crear nuevo empleador",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Actualiza la información del empleador por id (rut)
    // Solo puede actualizar: celular, email, direccion, razon social y telefono
    @PreAuthorize("hasAnyAuthority('BACKOFFICE')")
    @PutMapping("/{id}")
    public ResponseEntity updateEmpleador(@PathVariable("id") String id, @RequestBody EmpleadorRequest empleadorRequest) {
        Optional<Empleador> optEmpleador = empleadorRepository.findById(id);
        if(optEmpleador.isPresent()){
            try{
                Empleador empleador = optEmpleador.get();
                if(empleadorRequest.getCelular()!=null)
                    empleador.setCelular(empleadorRequest.getCelular());
                if(empleadorRequest.getEmail()!=null)
                    empleador.setEmail(empleadorRequest.getEmail());
                if(empleadorRequest.getDireccion()!=null)
                    empleador.setDireccion(empleadorRequest.getDireccion());
                if(empleadorRequest.getRazonSocial()!=null)
                    empleador.setRazonSocial(empleadorRequest.getRazonSocial());
                if(empleadorRequest.getTelefono()!=null)
                    empleador.setTelefono(empleadorRequest.getTelefono());
                return ResponseEntity.status(HttpStatus.OK).body(empleadorRepository.save(empleador));
            }catch(Exception e){
                ErrorResponse response = new ErrorResponse("Error al actualizar empleador",e.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        }else{
            ErrorResponse response = new ErrorResponse("Empleador no encontrado",null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // Elimina un empleador por id (rut)
    @PreAuthorize("hasAnyAuthority('BACKOFFICE')")
    @DeleteMapping("/{id}")
    public ResponseEntity deleteEmpleador(@PathVariable("id") String id){
        try{
            empleadorRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception e){
            ErrorResponse response = new ErrorResponse("Error al eliminar empleador",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Agrega una lista de trabajadores al empleador por id (rut)
    @PreAuthorize("hasAnyAuthority('BACKOFFICE')")
    @PutMapping("/{id}/trabajador")
    public ResponseEntity addTrabajadoresToEmpleador(@PathVariable("id") String id, @RequestBody EmpleadorRequest empleadorRequest) {
        Optional<Empleador> optEmpleador = empleadorRepository.findById(id);
        if(optEmpleador.isPresent()){
            try{
                Empleador empleador = optEmpleador.get();
                List<String> trabajadoresStr = empleadorRequest.getTrabajadores();
                if(trabajadoresStr!=null && !trabajadoresStr.isEmpty()){
                    List<Trabajador> trabajadores = trabajadoresStr
                        .stream()
                        .map(s -> trabajadorRepository.findById(s).get())
                        .collect(Collectors.toList());
                    empleador.setTrabajadores(trabajadores);
                    return ResponseEntity.status(HttpStatus.OK).body(empleadorRepository.save(empleador));
                }else{
                    ErrorResponse response = new ErrorResponse("Lista de trabajadores vacia",null);
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
                }
            }catch(Exception e){
                logger.error("Error al actualizar empleador", e);
                ErrorResponse response = new ErrorResponse("Error al actualizar empleador",e.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        }else{
            ErrorResponse response = new ErrorResponse("Empleador no encontrado",null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

}
