package cl.vass.practica.springreact.model.enums;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class TipoCargaConverter implements AttributeConverter<TipoCarga, String> {

    @Override
    public String convertToDatabaseColumn(TipoCarga tipo) {
        if(tipo==null){
            return null;
        }
        return tipo.getTipo();
    }

    @Override
    public TipoCarga convertToEntityAttribute(final String tipo) {
        if(tipo==null) {
            return null;
        }

        return Stream.of(TipoCarga.values())
            .filter(c -> c.getTipo().equals(tipo))
            .findFirst()
            .orElseThrow(IllegalArgumentException::new);
    }
    
}
