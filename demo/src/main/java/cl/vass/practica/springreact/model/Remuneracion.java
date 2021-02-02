package cl.vass.practica.springreact.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.lang.NonNull;

@Entity
@Table(name="remuneracion")
@IdClass(RemuneracionId.class)
public class Remuneracion implements Serializable {
    private static final long serialVersionUID = -8536428049680018174L;

    @Id
    @Column(name="carga_rut_carga")
    private String idCarga;

    @Id
    @Column(name="trabajador_rut_trabajador")
    private String idTrabajador;

    @Id
    @Column(name="empleador_rut_empleador")
    private String idEmpleador;

    @Id
    @Column(name="periodo_idperiodo")
    private Long idPeriodo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "carga_rut_carga")
    private Carga carga;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trabajador_rut_trabajador")
    private Trabajador trabajador;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empleador_rut_empleador")
    private Empleador empleador;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "periodo_idperiodo")
    private Periodo periodo;

    @Column(name="monto")
    @NonNull
    private Double monto;

    @Column(name="estado")
    @NonNull
    private int estado;

    public Remuneracion() {
    }

    public Carga getCarga() {
        return carga;
    }

    public void setCarga(Carga carga) {
        this.carga = carga;
    }

    public Trabajador getTrabajador() {
        return trabajador;
    }

    public void setTrabajador(Trabajador trabajador) {
        this.trabajador = trabajador;
    }

    public Empleador getEmpleador() {
        return empleador;
    }

    public void setEmpleador(Empleador empleador) {
        this.empleador = empleador;
    }

    public Periodo getPeriodo() {
        return periodo;
    }

    public void setPeriodo(Periodo periodo) {
        this.periodo = periodo;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public Remuneracion(Carga carga, Trabajador trabajador, Empleador empleador, Periodo periodo, Double monto,
            int estado) {
        this.carga = carga;
        this.trabajador = trabajador;
        this.empleador = empleador;
        this.periodo = periodo;
        this.monto = monto;
        this.estado = estado;
    }

}
