package cl.vass.practica.springreact.model.response;

public class ErrorResponse {
    private String mensaje;
    private String traza;

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getTraza() {
        return traza;
    }

    public void setTraza(String traza) {
        this.traza = traza;
    }

    public ErrorResponse(String mensaje, String traza) {
        this.mensaje = mensaje;
        this.traza = traza;
    }

    
}
