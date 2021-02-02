package cl.vass.practica.springreact.model.enums;

public enum TipoEmpleador {
    EMPRESA("1"), INDEPENDIENTE("2");

    private String tipo;

    private TipoEmpleador(String tipo) {
        this.tipo = tipo;
    }

    public String getTipo() {
        return tipo;
    }
}
