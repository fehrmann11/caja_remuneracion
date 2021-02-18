package cl.vass.practica.springreact.model.request;

import java.io.Serializable;

public class RemuneracionRequest implements Serializable {
    private static final long serialVersionUID = -2367982059916993595L;

    private String rutCarga;
    private String rutTrabajador;
    private String rutEmpleador;
    private long idPeriodo;
    private double monto;

    public RemuneracionRequest(String rutCarga, String rutTrabajador, String rutEmpleador, long idPeriodo,
            double monto) {
        this.rutCarga = rutCarga;
        this.rutTrabajador = rutTrabajador;
        this.rutEmpleador = rutEmpleador;
        this.idPeriodo = idPeriodo;
        this.monto = monto;
    }

    public String getRutCarga() {
        return rutCarga;
    }

    public void setRutCarga(String rutCarga) {
        this.rutCarga = rutCarga;
    }

    public String getRutTrabajador() {
        return rutTrabajador;
    }

    public void setRutTrabajador(String rutTrabajador) {
        this.rutTrabajador = rutTrabajador;
    }

    public String getRutEmpleador() {
        return rutEmpleador;
    }

    public void setRutEmpleador(String rutEmpleador) {
        this.rutEmpleador = rutEmpleador;
    }

    public long getIdPeriodo() {
        return idPeriodo;
    }

    public void setIdPeriodo(long idPeriodo) {
        this.idPeriodo = idPeriodo;
    }

    public double getMonto() {
        return monto;
    }

    public void setMonto(double monto) {
        this.monto = monto;
    }

    
    
}
