package cl.vass.practica.springreact.model;

import java.io.Serializable;

public class RemuneracionId implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String carga;

    private String trabajador;

    private String empleador;

    private Long periodo;

    public RemuneracionId() {
    }

    public RemuneracionId(String carga, String trabajador, String empleador, Long periodo) {
        this.carga = carga;
        this.trabajador = trabajador;
        this.empleador = empleador;
        this.periodo = periodo;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((carga == null) ? 0 : carga.hashCode());
        result = prime * result + ((trabajador == null) ? 0 : trabajador.hashCode());
        result = prime * result + ((empleador == null) ? 0 : empleador.hashCode());
        result = prime * result + ((periodo == null) ? 0 : periodo.hashCode());
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
        if (trabajador == null) {
            if (other.trabajador != null)
                return false;
        } else if (!trabajador.equals(other.trabajador))
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
        return true;
    }
}
