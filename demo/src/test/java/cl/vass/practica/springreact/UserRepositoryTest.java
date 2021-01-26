package cl.vass.practica.springreact;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.sql.DataSource;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.core.JdbcTemplate;

import cl.vass.practica.springreact.model.User;
import cl.vass.practica.springreact.repository.UserRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace=AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DataSource dataSource;
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Autowired
    private EntityManager entityManager;

    @Test
    void injectedComponentsAreNotNull(){
        assertNotNull(dataSource);
        assertNotNull(jdbcTemplate);
        assertNotNull(entityManager);
        assertNotNull(userRepository);
    }

    @Test
    public void whenFindUserByName_thenReturnUser(){
        String userName = "111111111";
        User foundUser = userRepository.findByUserName(userName);
        assertNotNull(foundUser);
        if(foundUser!=null){
            assertEquals(userName, foundUser.getUserName(),"Usuarios coincidentes");
        }
    }

    @Test
    void whenUserSaved_thenFindsByUserName(){
        userRepository.save(new User(
          "999999999",
          "$2a$10$bgYLsVV8Nk.fG6BoYOxIKuLJc3RVSIIRRlGaQdvDPm5EYqdbqYBEK"));
        assertNotNull(userRepository.findByUserName("111111111"),"Usuario creado exitosamente");
    }

    @Test
    public void whenFindUserByName_thenCheckAdminRole(){
        String userName = "111111111";
        String rol = "ADMIN";
        User foundUser = userRepository.findByUserName(userName);
        if(foundUser!=null){
            assertNotNull(foundUser
                .getRoles()
                .stream()
                .filter(u->u.getName().equalsIgnoreCase(rol))
                .findFirst()
                ,"Rol encontrado");
        }
    }
    
}
