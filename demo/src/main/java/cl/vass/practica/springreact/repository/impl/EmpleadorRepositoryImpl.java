package cl.vass.practica.springreact.repository.impl;

import cl.vass.practica.springreact.model.Empleador;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class EmpleadorRepositoryImpl {
    @PersistenceContext
    private EntityManager entityManager;
    public List<Empleador> getData(Map<String, Object> conditions){
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Empleador> query = cb.createQuery(Empleador.class);
        Root<Empleador> root = query.from(Empleador.class);

        List<Predicate> predicates = new ArrayList<>();
        conditions.forEach((field,value)->{
            switch (field){
                case "rut":
                    predicates.add(cb.like(root.get(field),"%"+(String)value+"%"));
                    break;
                case "razonSocial":
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
