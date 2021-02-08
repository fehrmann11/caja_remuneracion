package cl.vass.practica.springreact.model.response;

import java.io.Serializable;

import cl.vass.practica.springreact.model.enums.TipoCarga;

public class CargaResponse implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private final String rut;
    private final String nombres;
    private final String apellidoPaterno;
    private final String apellidoMaterno;
    private final TipoCarga tipoCarga;
    private final String rutTrabajador;

    public String getRut() {
        return rut;
    }

    public String getNombres() {
        return nombres;
    }

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public TipoCarga getTipoCarga() {
        return tipoCarga;
    }

    public String getRutTrabajador() {
        return rutTrabajador;
    }

    public CargaResponse(String rut, String nombres, String apellidoPaterno, String apellidoMaterno,
            TipoCarga tipoCarga, String rutTrabajador) {
        this.rut = rut;
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.tipoCarga = tipoCarga;
        this.rutTrabajador = rutTrabajador;
    }
    
}
