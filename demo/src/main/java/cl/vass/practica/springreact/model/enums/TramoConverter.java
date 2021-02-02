package cl.vass.practica.springreact.model.enums;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class TramoConverter implements AttributeConverter<Tramo, String> {

    @Override
    public String convertToDatabaseColumn(Tramo tipo) {
        if(tipo==null){
            return null;
        }
        return tipo.getTipo();
    }

    @Override
    public Tramo convertToEntityAttribute(final String tipo) {
        if(tipo==null) {
            return null;
        }

        return Stream.of(Tramo.values())
            .filter(c -> c.getTipo().equals(tipo))
            .findFirst()
            .orElseThrow(IllegalArgumentException::new);
    }
    
}
