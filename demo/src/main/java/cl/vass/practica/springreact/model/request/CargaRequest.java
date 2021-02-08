package cl.vass.practica.springreact.model.request;

import java.io.Serializable;

public class CargaRequest implements Serializable {
    private static final long serialVersionUID = 8167243020811836710L;

    private String rut;
    private String nombres;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String tipoCarga;
    private String rutTrabajador;

    public CargaRequest() {
    }

    public CargaRequest(String rut, String nombres, String apellidoPaterno, String apellidoMaterno, String tipoCarga,
            String rutTrabajador) {
        this.rut = rut;
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.tipoCarga = tipoCarga;
        this.rutTrabajador = rutTrabajador;
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

    public String getTipoCarga() {
        return tipoCarga;
    }

    public void setTipoCarga(String tipoCarga) {
        this.tipoCarga = tipoCarga;
    }

    public String getRutTrabajador() {
        return rutTrabajador;
    }

    public void setRutTrabajador(String rutTrabajador) {
        this.rutTrabajador = rutTrabajador;
    }
    
}
