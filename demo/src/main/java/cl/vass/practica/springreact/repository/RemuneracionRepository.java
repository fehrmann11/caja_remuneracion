package cl.vass.practica.springreact.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.vass.practica.springreact.model.Remuneracion;

public interface RemuneracionRepository extends JpaRepository<Remuneracion, Remuneracion.RemuneracionId> {
    
}
