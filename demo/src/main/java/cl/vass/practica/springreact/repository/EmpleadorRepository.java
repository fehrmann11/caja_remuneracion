package cl.vass.practica.springreact.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.vass.practica.springreact.model.Empleador;

import java.util.HashMap;
import java.util.List;

public interface EmpleadorRepository extends JpaRepository<Empleador, String> {
    //Buscar empleador por nombre
    public List<Empleador> getData(HashMap<String, Object> conditions);
}
