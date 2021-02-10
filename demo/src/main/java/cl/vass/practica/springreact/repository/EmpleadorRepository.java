package cl.vass.practica.springreact.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import cl.vass.practica.springreact.model.Empleador;

import java.util.List;
import java.util.Map;

public interface EmpleadorRepository extends JpaRepository<Empleador, String>, JpaSpecificationExecutor<Empleador> {
    //Buscar empleador por nombre
    public List<Empleador> getData(Map<String, Object> conditions);
}
