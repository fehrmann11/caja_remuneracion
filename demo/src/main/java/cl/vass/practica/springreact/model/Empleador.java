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
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import cl.vass.practica.springreact.model.enums.TipoEmpleador;

@Entity
@Table(name = "empleador")
public class Empleador implements Serializable {
    
    private static final long serialVersionUID = -5599840269012459442L;

    @Id
    @Column(name = "rut_empleador")
    private String rut;

    @Column(name = "razon_social")
    @NonNull
    private String razonSocial;

    @Column(name = "telefono_fijo")
    @NonNull
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

    @Column(name = "tipo_empleador")
    @NonNull
    private TipoEmpleador tipoEmpleador;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinTable(
        name = "empleador_has_trabajador",
        joinColumns = @JoinColumn(name = "empleador_rut_empleador", referencedColumnName = "rut_empleador", nullable = false, updatable = false),
        inverseJoinColumns = @JoinColumn(name = "trabajador_rut_trabajador", referencedColumnName = "rut_trabajador", nullable = false, updatable = false))
    private HashSet<Trabajador> trabajadores = new HashSet<>();

    @OneToMany(mappedBy = "empleador", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Remuneracion> remuneraciones;

    public Empleador() {
    }

    public Empleador(String rut, String razonSocial, String telefono, String email, TipoEmpleador tipoEmpleador) {
        this.rut = rut;
        this.razonSocial = razonSocial;
        this.telefono = telefono;
        this.email = email;
        this.tipoEmpleador = tipoEmpleador;
    }

    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
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

    public TipoEmpleador getTipoEmpleador() {
        return tipoEmpleador;
    }

    public void setTipoEmpleador(TipoEmpleador tipoEmpleador) {
        this.tipoEmpleador = tipoEmpleador;
    }

    public Set<Trabajador> getTrabajadores() {
        return trabajadores;
    }

    public void setTrabajadores(List<Trabajador> trabajadores) {
        this.trabajadores = new HashSet<>(trabajadores);
    }

    public Set<Remuneracion> getRemuneraciones() {
        return remuneraciones;
    }

}
