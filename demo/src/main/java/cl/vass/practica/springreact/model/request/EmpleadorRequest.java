package cl.vass.practica.springreact.model.request;

public class EmpleadorRequest {
    private String rut;
    private String razonSocial;
    private String telefono;
    private String celular;
    private String email;
    private String direccion;
    private String tipoEmpleador;

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

    public String getTipoEmpleador() {
        return tipoEmpleador;
    }

    public void setTipoEmpleador(String tipoEmpleador) {
        this.tipoEmpleador = tipoEmpleador;
    }

    public EmpleadorRequest(String rut, String razonSocial, String telefono, String celular, String email,
            String direccion, String tipoEmpleador) {
        this.rut = rut;
        this.razonSocial = razonSocial;
        this.telefono = telefono;
        this.celular = celular;
        this.email = email;
        this.direccion = direccion;
        this.tipoEmpleador = tipoEmpleador;
    }

    public EmpleadorRequest() {
    }
    
}
