package cl.vass.practica.springreact.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.lang.NonNull;

@Entity
@Table(name="remuneracion")
public class Remuneracion implements Serializable {
    private static final long serialVersionUID = -8536428049680018174L;

    @Embeddable
    static class RemuneracionId implements Serializable {
        private static final long serialVersionUID = -7095701651379184525L;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "carga_rut_carga", nullable = false, insertable = false, updatable = false)
        private Carga carga;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "trabajador_rut_trabajador", nullable = false, insertable = false, updatable = false)
        private Trabajador trabajador;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "empleador_rut_empleador", nullable = false, insertable = false, updatable = false)
        private Empleador empleador;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "periodo_idperiodo", nullable = false, insertable = false, updatable = false)
        private Periodo periodo;

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

        @Override
        public int hashCode() {
            final int prime = 31;
            int result = 1;
            result = prime * result + ((carga == null) ? 0 : carga.hashCode());
            result = prime * result + ((empleador == null) ? 0 : empleador.hashCode());
            result = prime * result + ((periodo == null) ? 0 : periodo.hashCode());
            result = prime * result + ((trabajador == null) ? 0 : trabajador.hashCode());
            return result;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj)
                return true;
            if (obj == null)
                return false;
            if (getClass() != obj.getClass())
                return false;
            RemuneracionId other = (RemuneracionId) obj;
            if (carga == null) {
                if (other.carga != null)
                    return false;
            } else if (!carga.equals(other.carga))
                return false;
            if (empleador == null) {
                if (other.empleador != null)
                    return false;
            } else if (!empleador.equals(other.empleador))
                return false;
            if (periodo == null) {
                if (other.periodo != null)
                    return false;
            } else if (!periodo.equals(other.periodo))
                return false;
            if (trabajador == null) {
                if (other.trabajador != null)
                    return false;
            } else if (!trabajador.equals(other.trabajador))
                return false;
            return true;
        }

        public RemuneracionId() {
        }

        public RemuneracionId(Carga carga, Trabajador trabajador, Empleador empleador, Periodo periodo) {
            this.carga = carga;
            this.trabajador = trabajador;
            this.empleador = empleador;
            this.periodo = periodo;
        }
    }

    @EmbeddedId
    private RemuneracionId id;

    @Column(name="monto")
    @NonNull
    private Double monto;

    @Column(name="estado")
    @NonNull
    private int estado;

    public Remuneracion() {
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

    public Remuneracion(RemuneracionId id, Double monto, int estado) {
        this.id = id;
        this.monto = monto;
        this.estado = estado;
    }

    public RemuneracionId getId() {
        return id;
    }

    public void setId(RemuneracionId id) {
        this.id = id;
    }

}
