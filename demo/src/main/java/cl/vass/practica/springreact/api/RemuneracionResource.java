package cl.vass.practica.springreact.api;

import java.util.Optional;

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
import cl.vass.practica.springreact.model.Empleador;
import cl.vass.practica.springreact.model.Periodo;
import cl.vass.practica.springreact.model.Remuneracion;
import cl.vass.practica.springreact.model.Remuneracion.RemuneracionId;
import cl.vass.practica.springreact.model.Trabajador;
import cl.vass.practica.springreact.model.request.RemuneracionRequest;
import cl.vass.practica.springreact.model.response.ErrorResponse;
import cl.vass.practica.springreact.repository.CargaRepository;
import cl.vass.practica.springreact.repository.EmpleadorRepository;
import cl.vass.practica.springreact.repository.PeriodoRepository;
import cl.vass.practica.springreact.repository.RemuneracionRepository;
import cl.vass.practica.springreact.repository.TrabajadorRepository;

@RestController
@RequestMapping("/private/remuneracion")
@CrossOrigin(origins = "*", maxAge = 3600)
public class RemuneracionResource {
    
    @Autowired
    RemuneracionRepository remuneracionRepository;

    @Autowired
    CargaRepository cargaRepository;

    @Autowired
    TrabajadorRepository trabajadorRepository;

    @Autowired
    EmpleadorRepository empleadorRepository;

    @Autowired
    PeriodoRepository periodoRepository;

    // Busca remuneracion por id
    @PreAuthorize("hasAnyAuthority('ADMIN','BACKOFFICE','NEGOCIO')")
    @GetMapping("/carga/{id_carga}/trabajador/{id_trabajador}/empleador/{id_empleador}/periodo/{id_periodo}")
    public ResponseEntity getRemuneracionById(@PathVariable("id_carga") String idCarga,
        @PathVariable("id_trabajador") String idTrabajador,
        @PathVariable("id_empleador") String idEmpleador,
        @PathVariable("id_periodo") long idPeriodo){
        try{
            GetRemuneracionId id = getRemuneracionId(idCarga, idTrabajador, idEmpleador, idPeriodo);
            if(!id.isStatus()){
                ErrorResponse response = new ErrorResponse(id.getErrorMessage(),null);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            Optional<Remuneracion> optRemuneracion = remuneracionRepository.findById(id.getId());
            if(optRemuneracion.isPresent()){
                return ResponseEntity.status(HttpStatus.OK).body(optRemuneracion.get());
            }else{
                ErrorResponse response = new ErrorResponse("Remuneracion no encontrada",null);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        }catch(Exception e){
            ErrorResponse response = new ErrorResponse("Error al recuperar remuneracion",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Crea una remuneracion
    @PreAuthorize("hasAnyAuthority('BACKOFFICE')")
    @PostMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity addRemuneracion(@RequestBody RemuneracionRequest remuneracionRequest){
        try{
            GetRemuneracionId id = getRemuneracionId(
                remuneracionRequest.getRutCarga(),
                remuneracionRequest.getRutTrabajador(),
                remuneracionRequest.getRutEmpleador(),
                remuneracionRequest.getIdPeriodo());
            if(!id.isStatus()){
                ErrorResponse response = new ErrorResponse(id.getErrorMessage(),null);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            Remuneracion nuevaRemuneracion = remuneracionRepository
                .save(new Remuneracion(
                    id.getId(), 
                    remuneracionRequest.getMonto(),
                    1)
                );
            
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaRemuneracion);
        }catch(Exception e){
            ErrorResponse response = new ErrorResponse("Error al crear remuneracion",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Actualiza la información de la remuneracion por id (compuesto)
    // Solo puede actualizar: monto y periodo
    @PreAuthorize("hasAnyAuthority('BACKOFFICE')")
    @PutMapping("/carga/{id_carga}/trabajador/{id_trabajador}/empleador/{id_empleador}/periodo/{id_periodo}")
    public ResponseEntity updateRemuneracion(@PathVariable("id_carga") String idCarga,
        @PathVariable("id_trabajador") String idTrabajador,
        @PathVariable("id_empleador") String idEmpleador,
        @PathVariable("id_periodo") long idPeriodo,
        @RequestBody RemuneracionRequest remuneracionRequest) {
        
        GetRemuneracionId id = getRemuneracionId(idCarga, idTrabajador, idEmpleador, idPeriodo);
        if(!id.isStatus()){
            ErrorResponse response = new ErrorResponse(id.getErrorMessage(),null);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        Optional<Remuneracion> optRemuneracion = remuneracionRepository.findById(id.getId());
        if(optRemuneracion.isPresent()){
            try{
                Remuneracion remuneracion = optRemuneracion.get();
                remuneracion.setMonto(remuneracionRequest.getMonto());
                return ResponseEntity.status(HttpStatus.OK).body(remuneracionRepository.save(remuneracion));
            }catch(Exception e){
                ErrorResponse response = new ErrorResponse("Error al actualizar remuneracion",e.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        }else{
            ErrorResponse response = new ErrorResponse("Remuneracion no encontrada",null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // Elimina una remuneracion por id
    @PreAuthorize("hasAnyAuthority('BACKOFFICE')")
    @DeleteMapping("/carga/{id_carga}/trabajador/{id_trabajador}/empleador/{id_empleador}/periodo/{id_periodo}")
    public ResponseEntity deleteRemuneracion(@PathVariable("id_carga") String idCarga,
        @PathVariable("id_trabajador") String idTrabajador,
        @PathVariable("id_empleador") String idEmpleador,
        @PathVariable("id_periodo") long idPeriodo){
        try{
            GetRemuneracionId id = getRemuneracionId(idCarga, idTrabajador, idEmpleador, idPeriodo);
            if(!id.isStatus()){
                ErrorResponse response = new ErrorResponse(id.getErrorMessage(),null);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            remuneracionRepository.deleteById(id.getId());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception e){
            ErrorResponse response = new ErrorResponse("Error al eliminar remuneracion",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    private GetRemuneracionId getRemuneracionId(String idCarga, String idTrabajador, String idEmpleador, long idPeriodo){
        Optional<Carga> optCarga = cargaRepository.findById(idCarga);
        if(!optCarga.isPresent()){
            return new GetRemuneracionId(false, "Carga no encontrada", null);
        }

        Optional<Trabajador> optTrabajador = trabajadorRepository.findById(idTrabajador);
        if(!optTrabajador.isPresent()){
            return new GetRemuneracionId(false, "Trabajador no encontrado", null);
        }

        Optional<Empleador> optEmpleador = empleadorRepository.findById(idEmpleador);
        if(!optEmpleador.isPresent()){
            return new GetRemuneracionId(false, "Empleador no encontrado", null);
        }

        Optional<Periodo> optPeriodo = periodoRepository.findById(idPeriodo);
        if(!optPeriodo.isPresent()){
            return new GetRemuneracionId(false, "Periodo no encontrado", null);
        }

        return new GetRemuneracionId(true, 
            null, 
            new Remuneracion.RemuneracionId(
                optCarga.get(), 
                optTrabajador.get(), 
                optEmpleador.get(), 
                optPeriodo.get())
            );
    }

    class GetRemuneracionId{
        private boolean status;
        private String errorMessage;
        private RemuneracionId id;

        public GetRemuneracionId(boolean status, String errorMessage, RemuneracionId id) {
            this.status = status;
            this.errorMessage = errorMessage;
            this.id = id;
        }

        public boolean isStatus() {
            return status;
        }

        public void setStatus(boolean status) {
            this.status = status;
        }

        public String getErrorMessage() {
            return errorMessage;
        }

        public void setErrorMessage(String errorMessage) {
            this.errorMessage = errorMessage;
        }

        public RemuneracionId getId() {
            return id;
        }

        public void setId(RemuneracionId id) {
            this.id = id;
        }
    }
}
