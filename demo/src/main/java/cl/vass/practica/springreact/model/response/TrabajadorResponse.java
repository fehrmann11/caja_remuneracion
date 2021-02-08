package cl.vass.practica.springreact.model.response;

import cl.vass.practica.springreact.model.enums.Tramo;

public class TrabajadorResponse {
    private final String rut;
    private final String nombres;
    private final String apellidoPaterno;
    private final String apellidoMaterno;
    private final String telefono;
    private final String celular;
    private final String email;
    private final String direccion;
    private final Tramo tramo;

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

    public Tramo getTramo() {
        return tramo;
    }

    public TrabajadorResponse(String rut, String nombres, String apellidoPaterno, String apellidoMaterno,
            String telefono, String celular, String email, String direccion, Tramo tramo) {
        this.rut = rut;
        this.nombres = nombres;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.telefono = telefono;
        this.celular = celular;
        this.email = email;
        this.direccion = direccion;
        this.tramo = tramo;
    }
}
