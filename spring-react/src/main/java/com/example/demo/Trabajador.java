package com.example.demo;

public class Trabajador {
    private String RUT_TRABAJADOR;
    private String NOMBRES;
    private String APELLIDO_PATERNO;
    private String APELLIDO_MATERNO;
    private String TELEFONO_FIJO;
    private String TELEFONO_CELULAR;
    private String CORREO_ELECTRÓNICO;
    private String DIRECCION;
    private Character TRAMO;

    public String getRUT_TRABAJADOR() {
        return RUT_TRABAJADOR;
    }

    public void setRUT_TRABAJADOR(String RUT_TRABAJADOR) {
        this.RUT_TRABAJADOR = RUT_TRABAJADOR;
    }

    public String getNOMBRES() {
        return NOMBRES;
    }

    public void setNOMBRES(String NOMBRES) {
        this.NOMBRES = NOMBRES;
    }

    public String getAPELLIDO_PATERNO() {
        return APELLIDO_PATERNO;
    }

    public void setAPELLIDO_PATERNO(String APELLIDO_PATERNO) {
        this.APELLIDO_PATERNO = APELLIDO_PATERNO;
    }

    public String getAPELLIDO_MATERNO() {
        return APELLIDO_MATERNO;
    }

    public void setAPELLIDO_MATERNO(String APELLIDO_MATERNO) {
        this.APELLIDO_MATERNO = APELLIDO_MATERNO;
    }

    public String getTELEFONO_FIJO() {
        return TELEFONO_FIJO;
    }

    public void setTELEFONO_FIJO(String TELEFONO_FIJO) {
        this.TELEFONO_FIJO = TELEFONO_FIJO;
    }

    public String getTELEFONO_CELULAR() {
        return TELEFONO_CELULAR;
    }

    public void setTELEFONO_CELULAR(String TELEFONO_CELULAR) {
        this.TELEFONO_CELULAR = TELEFONO_CELULAR;
    }

    public String getCORREO_ELECTRÓNICO() {
        return CORREO_ELECTRÓNICO;
    }

    public void setCORREO_ELECTRÓNICO(String CORREO_ELECTRÓNICO) {
        this.CORREO_ELECTRÓNICO = CORREO_ELECTRÓNICO;
    }

    public String getDIRECCION() {
        return DIRECCION;
    }

    public void setDIRECCION(String DIRECCION) {
        this.DIRECCION = DIRECCION;
    }

    public Character getTRAMO() {
        return TRAMO;
    }

    public void setTRAMO(Character TRAMO) {
        this.TRAMO = TRAMO;
    }

    @Override
    public String toString() {
        return "Trabajador{" +
                "RUT_TRABAJADOR='" + RUT_TRABAJADOR + '\'' +
                ", NOMBRES='" + NOMBRES + '\'' +
                ", APELLIDO_PATERNO='" + APELLIDO_PATERNO + '\'' +
                ", APELLIDO_MATERNO='" + APELLIDO_MATERNO + '\'' +
                ", TELEFONO_FIJO='" + TELEFONO_FIJO + '\'' +
                ", TELEFONO_CELULAR='" + TELEFONO_CELULAR + '\'' +
                ", CORREO_ELECTRÓNICO='" + CORREO_ELECTRÓNICO + '\'' +
                ", DIRECCION='" + DIRECCION + '\'' +
                ", TRAMO=" + TRAMO +
                '}';
    }
}
