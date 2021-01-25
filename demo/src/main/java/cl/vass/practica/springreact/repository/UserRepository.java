package cl.vass.practica.springreact.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.vass.practica.springreact.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserName(String userName);
}
