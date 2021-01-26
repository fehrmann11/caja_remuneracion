package cl.vass.practica.springreact.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.vass.practica.springreact.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserName(String userName);
}
