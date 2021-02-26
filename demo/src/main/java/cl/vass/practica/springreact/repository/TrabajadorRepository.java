package cl.vass.practica.springreact.repository;


import cl.vass.practica.springreact.model.Trabajador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;

public interface TrabajadorRepository extends JpaRepository<Trabajador, String> {
    //Buscar empleador por nombre
    public List<Trabajador> getData(Map<String, Object> conditions);
}
