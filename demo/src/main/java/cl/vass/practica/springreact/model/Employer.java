package cl.vass.practica.springreact.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "empleador")
public class Employer {
    @Id
    @Column(name = "rut_empleador")
    private String rutEmployer;

    @Column(name = "razon_social")
    private String businessName ;

    @Column(name = "telefono_fijo")
    private String landline;

    @Column(name = "telefono_celular")
    private String cellPhone;

    @Column(name = "email")
    private String email;

    @Column(name = "direccion")
    private String address;




}
