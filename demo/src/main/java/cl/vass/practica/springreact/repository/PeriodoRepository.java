package cl.vass.practica.springreact.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.vass.practica.springreact.model.Periodo;

public interface PeriodoRepository extends JpaRepository<Periodo, Long> {
    
}
