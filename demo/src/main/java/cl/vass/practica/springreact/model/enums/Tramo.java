package cl.vass.practica.springreact.model.enums;

public enum Tramo {
    TRAMO_A("A"), TRAMO_B("B"), TRAMO_C("C"), TRAMO_D("D");

    private String tipo;

    private Tramo(String tipo) {
        this.tipo = tipo;
    }

    public String getTipo() {
        return tipo;
    }
}
