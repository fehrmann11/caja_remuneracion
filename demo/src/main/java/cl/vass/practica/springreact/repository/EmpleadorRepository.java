package cl.vass.practica.springreact.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.vass.practica.springreact.model.Empleador;

public interface EmpleadorRepository extends JpaRepository<Empleador, String> {
    
}
