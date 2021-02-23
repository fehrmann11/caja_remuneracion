import verificador from 'verificador-rut';
import {useState,useContext} from 'react';
import Estado from './Estado';
import EnterprisesService from '../../api/EnterprisesService';
const Selector = ({trabajador}) => {
    const [cargas,setCargas] = useState([]);
    const [empleadores,setEmpleadores] = useState([]);
    const [periodo,setPeriodo] = useState([]);
    var {estado,setEstado} = useContext(Estado);
    //Esta funcionalidad lo que busca es traer las cargas, y los empleadores.
    const DetailInput = async(rut) =>{
        estado = setEstado(true);
        
        try {
            const response = await EnterprisesService.returnGet(`/private/trabajador/${rut}/cargas`);
            const response_empleador = await EnterprisesService.returnGet(`/private/trabajador/${rut}/empleador`);
            const response_periodo = await EnterprisesService.returnGet('/private/periodo');

            setCargas(response.data);
            setEmpleadores(response_empleador.data);
            setPeriodo(response_periodo.data);

        } catch (error) {
            console.log(error);
        }

    }

    const ocultar = () =>{
        estado = setEstado(false);
    }

    console.log(cargas);
    console.log(empleadores);
    console.log(periodo);

    return (
    
        <tr id="info" onClick={() => DetailInput(trabajador.rut)} key={trabajador.rut}>
            <td >{trabajador.nombres} {trabajador.apellidoPaterno} {trabajador.apellidoMaterno}</td>
            <td >{trabajador.rut.slice(0, trabajador.rut.length - 1) + "-" + verificador(trabajador.rut.slice(0, trabajador.rut.length - 1))}</td>
        </tr>
        
        
    )
}

export default Selector;