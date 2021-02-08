package cl.vass.practica.springreact.model.response;

import cl.vass.practica.springreact.model.Trabajador;

public class TrabajadorResponse {
    private  String nombre;

    public TrabajadorResponse() {

    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

//    public TrabajadorResponse(TrabajadorResponse nombre) {
//
//        this.nombre = nombre;
//    }

    public TrabajadorResponse(Trabajador nombre) {
    }
}
