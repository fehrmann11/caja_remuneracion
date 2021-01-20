package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		String sql="INSERT INTO trabajador (rut_trabajador,nombres,telefono_fijo,telefono_celular,email,direccion,tramo,apellido_paterno,apellido_materno) VALUES(?,?,?,?,?,?,?,?,?)";
		int result = jdbcTemplate.update(sql,"19.992.882-1","Viviano","23232","992522924","viviano@gmail.com","isla refugio 8888","C","Ber","Cárcamo");
		if (result > 0){
			System.out.println("holaaa");
		}
	}

}
