package cl.vass.practica.springreact.repository;

import cl.vass.practica.springreact.model.Trabajador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrabajadorRepository extends JpaRepository<Trabajador, String> {

}
