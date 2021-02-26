package cl.vass.practica.springreact.repository.impl;




import cl.vass.practica.springreact.model.Trabajador;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class TrabajadorRepositoryImpl {
    @PersistenceContext
    private EntityManager entityManager;
    public List<Trabajador> getData(Map<String, Object> conditions){
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Trabajador> query = cb.createQuery(Trabajador.class);
        Root<Trabajador> root = query.from(Trabajador.class);
        List<Predicate> predicates = new ArrayList<>();
        conditions.forEach((field,value)->{
            switch (field){
                case "rut":
                    predicates.add(cb.like(root.get(field),"%"+(String)value+"%"));
                    break;
                case "apellidoPaterno":
                    predicates.add(cb.like(root.get(field),"%"+(String)value+"%"));
                    break;
                default:
                    break;
            }
        });
        query.select(root).where(predicates.toArray(new Predicate[predicates.size()]));
        return entityManager.createQuery(query).getResultList();
    }


}
