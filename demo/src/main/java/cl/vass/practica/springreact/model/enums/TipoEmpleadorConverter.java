package cl.vass.practica.springreact.model.enums;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class TipoEmpleadorConverter implements AttributeConverter<TipoEmpleador, String> {

    @Override
    public String convertToDatabaseColumn(TipoEmpleador tipo) {
        if(tipo==null){
            return null;
        }
        return tipo.getTipo();
    }

    @Override
    public TipoEmpleador convertToEntityAttribute(final String tipo) {
        if(tipo==null) {
            return null;
        }

        return Stream.of(TipoEmpleador.values())
            .filter(c -> c.getTipo().equals(tipo))
            .findFirst()
            .orElseThrow(IllegalArgumentException::new);
    }
    
}
