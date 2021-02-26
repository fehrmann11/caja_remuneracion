package cl.vass.practica.springreact.model.response;

import cl.vass.practica.springreact.model.enums.TipoEmpleador;

public class EmpleadorResponse {
    private final String rut;
    private final String razonSocial;
    private final String telefono;
    private final String celular;
    private final String email;
    private final String direccion;
    private final TipoEmpleador tipoEmpleador;



    public String getRut() {
        return rut;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public String getTelefono() {
        return telefono;
    }

    public String getCelular() {
        return celular;
    }

    public String getEmail() {
        return email;
    }

    public String getDireccion() {
        return direccion;
    }

    public TipoEmpleador getTipoEmpleador() {
        return tipoEmpleador;
    }

    public EmpleadorResponse(String rut, String razonSocial, String telefono, String celular, String email,
            String direccion, TipoEmpleador tipoEmpleador) {
        this.rut = rut;
        this.razonSocial = razonSocial;
        this.telefono = telefono;
        this.celular = celular;
        this.email = email;
        this.direccion = direccion;
        this.tipoEmpleador = tipoEmpleador;
    }
}
