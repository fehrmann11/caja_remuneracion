package cl.vass.practica.springreact.model.enums;

public enum TipoCarga {
    SIMPLE("1"), MATERNAL("2"), INVALIDA("3");

    private String tipo;

    private TipoCarga(String tipo) {
        this.tipo = tipo;
    }

    public String getTipo() {
        return tipo;
    }
}
