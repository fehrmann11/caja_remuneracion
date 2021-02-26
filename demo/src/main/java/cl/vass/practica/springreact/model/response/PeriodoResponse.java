package cl.vass.practica.springreact.model.response;

import cl.vass.practica.springreact.model.enums.Tramo;

import java.util.Date;

public class PeriodoResponse {
    private final Long id;

    private final String nombre;
    private final Date fechaDesde;
    private final Date fechaHasta;

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public Date getFechaDesde() {
        return fechaDesde;
    }

    public Date getFechaHasta() {
        return fechaHasta;
    }

    public PeriodoResponse(Long id, String nombre, Date fechaDesde, Date fechaHasta) {
        this.id = id;
        this.nombre = nombre;
        this.fechaDesde = fechaDesde;
        this.fechaHasta = fechaHasta;
    }
}
