package cl.vass.practica.springreact.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import cl.vass.practica.springreact.model.enums.Tramo;

@Entity
@Table(name = "trabajador")
public class Trabajador implements Serializable {

    private static final long serialVersionUID = 6851432569043222682L;

    @Id
    @Column(name = "rut_trabajador")
    private String rut;

    @Column(name = "nombres")
    @NonNull
    private String nombres;

    @Column(name = "apellido_paterno")
    @NonNull
    private String apellidoPaterno;

    @Column(name = "apellido_materno")
    @Nullable
    private String apellidoMaterno;

    @Column(name = "telefono_fijo")
    @Nullable
    private String telefono;

    @Column(name = "telefono_celular")
    @Nullable
    private String celular;

    @Column(name = "email")
    @NonNull
    private String email;

    @Column(name = "direccion")
    @Nullable
    private String direccion;

    @Column(name = "tramo")
    @NonNull
    private Tramo tramo;

    @ManyToMany(mappedBy = "trabajadores", fetch = FetchType.LAZY)
    private HashSet<Empleador> empleadores = new HashSet<>();

    @OneToMany(mappedBy = "trabajador", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Carga> cargas;

    @OneToMany(mappedBy = "trabajador", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Remuneracion> remuneraciones;

    public Trabajador() {
    }

    public Trabajador(String rut, String nombres, String apellidoPaterno, String email, Tramo tramo) {
        this.rut = rut;
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.email = email;
        this.tramo = tramo;
    }

    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Tramo getTramo() {
        return tramo;
    }

    public void setTramo(Tramo tramo) {
        this.tramo = tramo;
    }

    public Set<Empleador> getEmpleadores() {
        return empleadores;
    }

    public void setEmpleadores(List<Empleador> empleadores) {
        this.empleadores = new HashSet<>(empleadores);
    }

    public Set<Carga> getCargas() {
        return cargas;
    }

    public void setCargas(List<Carga> cargas) {
        this.cargas = new HashSet<>(cargas);
    }

    public Set<Remuneracion> getRemuneraciones() {
        return remuneraciones;
    }

}
