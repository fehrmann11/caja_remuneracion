package cl.vass.practica.springreact.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.vass.practica.springreact.model.Carga;

public interface CargaRepository extends JpaRepository<Carga, String> {
    
}
