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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import cl.vass.practica.springreact.model.enums.TipoCarga;

@Entity
@Table(name = "carga")
public class Carga implements Serializable {
    private static final long serialVersionUID = -8106462631573253463L;

    @Id
    @Column(name="rut_carga")
    private String rut;

    @Column(name="nombres")
    @NonNull
    private String nombres;

    @Column(name="apellido_paterno")
    @NonNull
    private String apellidoPaterno;

    @Column(name="apellido_materno")
    @Nullable
    private String apellidoMaterno;

    @Column(name="tipo_carga")
    @NonNull
    private TipoCarga tipo;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "trabajador_rut_trabajador", nullable = false)
    private Trabajador trabajador;

    @OneToMany(mappedBy = "carga", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Remuneracion> remuneraciones;

    public Carga() {
    }

    public Carga(String rut, String nombres, String apellidoPaterno, TipoCarga tipo) {
        this.rut = rut;
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.tipo = tipo;
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

    public TipoCarga getTipo() {
        return tipo;
    }

    public void setTipo(TipoCarga tipo) {
        this.tipo = tipo;
    }

    public Trabajador getTrabajador() {
        return trabajador;
    }

    public void setTrabajador(Trabajador trabajador) {
        this.trabajador = trabajador;
    }

    public Set<Remuneracion> getRemuneraciones() {
        return remuneraciones;
    }

    public void setRemuneraciones(List<Remuneracion> remuneraciones) {
        this.remuneraciones = new HashSet<>(remuneraciones);
    }
   
}
