package cl.vass.practica.springreact.api;

import java.util.Optional;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.vass.practica.springreact.model.Carga;
import cl.vass.practica.springreact.model.Trabajador;
import cl.vass.practica.springreact.model.enums.TipoCarga;
import cl.vass.practica.springreact.model.request.CargaRequest;
import cl.vass.practica.springreact.model.response.CargaResponse;
import cl.vass.practica.springreact.model.response.ErrorResponse;
import cl.vass.practica.springreact.repository.CargaRepository;
import cl.vass.practica.springreact.repository.TrabajadorRepository;
import cl.vass.practica.springreact.util.EnumUtils;

@RestController
@RequestMapping("/private/carga")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CargaResource {
    @Autowired
    CargaRepository cargaRepository;

    @Autowired
    TrabajadorRepository trabajadorRepository;

    // Busca carga por id (rut)
    @PreAuthorize("hasAnyAuthority('ADMIN','BACKOFFICE','NEGOCIO')")
    @GetMapping("/{id}")
    public ResponseEntity getCargaByRut(@PathVariable("id") String id){
        try{
            Optional<Carga> optCarga = cargaRepository.findById(id);
            if(optCarga.isPresent()){
                Carga carga =  optCarga.get();
                CargaResponse response = new CargaResponse(
                    carga.getRut(), 
                    carga.getNombres(), 
                    carga.getApellidoPaterno(), 
                    carga.getApellidoMaterno(), 
                    carga.getTipo(), 
                    carga.getTrabajador().getRut());
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }else{
                ErrorResponse response = new ErrorResponse("Carga no encontrada",null);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        }catch(Exception e){
            ErrorResponse response = new ErrorResponse("Error al recuperar carga",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Crea una nueva carga
    @PreAuthorize("hasAnyAuthority('BACKOFFICE')")
    @PostMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity addCarga(@RequestBody CargaRequest cargaRequest){
        try{

            Optional<Trabajador> trabajador = trabajadorRepository.findById(cargaRequest.getRutTrabajador());
            if(trabajador.isPresent()){
                final Function<String, TipoCarga> func = EnumUtils.lookupMap(TipoCarga.class, TipoCarga::getTipo);
                Carga nuevaCarga = cargaRepository
                    .save(new Carga(
                        cargaRequest.getRut(), 
                        cargaRequest.getNombres(),
                        cargaRequest.getApellidoPaterno(),
                        cargaRequest.getApellidoMaterno(),
                        func.apply(cargaRequest.getTipoCarga()),
                        trabajador.get()));
                CargaResponse response = new CargaResponse(
                    nuevaCarga.getRut(), 
                    nuevaCarga.getNombres(), 
                    nuevaCarga.getApellidoPaterno(), 
                    nuevaCarga.getApellidoMaterno(), 
                    nuevaCarga.getTipo(), 
                    nuevaCarga.getTrabajador().getRut());
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            }else{
                ErrorResponse response = new ErrorResponse("Trabajador no encontrado",null);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        }catch(Exception e){
            ErrorResponse response = new ErrorResponse("Error al crear nuevo empleador",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Actualiza la información de la carga por id (rut)
    // Solo puede actualizar: nombres, apellidos y tipo carga
    @PreAuthorize("hasAnyAuthority('BACKOFFICE')")
    @PutMapping("/{id}")
    public ResponseEntity updateCarga(@PathVariable("id") String id, @RequestBody CargaRequest cargaRequest) {
        Optional<Carga> optCarga = cargaRepository.findById(id);
        if(optCarga.isPresent()){
            try{
                Carga carga = optCarga.get();
                if(cargaRequest.getNombres()!=null)
                    carga.setNombres(cargaRequest.getNombres());
                if(cargaRequest.getApellidoPaterno()!=null)
                    carga.setApellidoPaterno(cargaRequest.getApellidoPaterno());
                if(cargaRequest.getApellidoMaterno()!=null)
                    carga.setApellidoMaterno(cargaRequest.getApellidoMaterno());
                if(cargaRequest.getTipoCarga()!=null){
                    final Function<String, TipoCarga> func = EnumUtils.lookupMap(TipoCarga.class, TipoCarga::getTipo);
                    carga.setTipo(func.apply(cargaRequest.getTipoCarga()));
                }
                Carga savedCarga = cargaRepository.save(carga);
                CargaResponse response = new CargaResponse(
                    savedCarga.getRut(), 
                    savedCarga.getNombres(), 
                    savedCarga.getApellidoPaterno(), 
                    savedCarga.getApellidoMaterno(), 
                    savedCarga.getTipo(), 
                    savedCarga.getTrabajador().getRut());
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }catch(Exception e){
                ErrorResponse response = new ErrorResponse("Error al actualizar carga",e.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        }else{
            ErrorResponse response = new ErrorResponse("Carga no encontrada",null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // Elimina una carga por id (rut)
    @PreAuthorize("hasAnyAuthority('BACKOFFICE')")
    @DeleteMapping("/{id}")
    public ResponseEntity deleteCarga(@PathVariable("id") String id){
        try{
            cargaRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception e){
            ErrorResponse response = new ErrorResponse("Error al eliminar carga",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
