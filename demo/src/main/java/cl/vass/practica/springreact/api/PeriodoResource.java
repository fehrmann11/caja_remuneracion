package cl.vass.practica.springreact.api;

import cl.vass.practica.springreact.model.Periodo;
import cl.vass.practica.springreact.model.response.ErrorResponse;
import cl.vass.practica.springreact.model.response.PeriodoResponse;
import cl.vass.practica.springreact.repository.PeriodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/private/periodo")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PeriodoResource {

    @Autowired
    PeriodoRepository periodoRepository;

    @PreAuthorize("hasAnyAuthority('ADMIN','BACKOFFICE','NEGOCIO')")
    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity getPeriodo(){
        try{
            List<Periodo> periodo = periodoRepository.findAll();
            List<PeriodoResponse> periodoResponse = periodo
                    .stream()
                    .map(t -> new PeriodoResponse(
                            t.getId(),
                            t.getNombre(),
                            t.getFechaHasta(),
                            t.getFechaDesde()))
                    .collect(Collectors.toList());
            return  ResponseEntity.ok(periodoResponse);


        }catch (Exception e){
            ErrorResponse response = new ErrorResponse("Error al recuperar trabajadores",e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
