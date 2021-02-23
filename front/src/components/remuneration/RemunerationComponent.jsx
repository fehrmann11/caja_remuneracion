import Title from '../reuseComponent/Title';
import useGetdata from '../hooks/useGetdata';
import { Table} from 'react-bootstrap';
import verificador  from 'verificador-rut';
import EnterprisesService from '../../api/EnterprisesService';
import {useState} from 'react';
import { useHistory } from 'react-router-dom';


const RemunerationComponent = () => {
    const [cargas,setCargas] = useState([]);
    const [empleadores,setEmpleadores] = useState([]);
    var [estado, setEstado] = useState(false);
    const [periodo,setPeriodo] = useState([]);
    const [rut,setRut] = useState('');

    let history = useHistory();

    const API_TRABAJADOR = '/private/trabajador';
    const trabajadores = useGetdata(API_TRABAJADOR);
    
    
    
    //Esta funcionalidad lo que busca es traer las cargas, y los empleadores.
    const DetailInput = async(rut) =>{
        setEstado(true);
        setRut(rut);
        
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

    const Consultar = (id) =>{
        console.log(id)
        history.push(`/remuneration/${id}`)
    //     //función que actualiza una empresa
    // const updateEnterprise = (id) => {
    //     history.push(`/enterprisesManagement/${id}`)
    // }
    }


    return (

        <div className="container">
            <Title titulo="Remuneraciones" />
            {/*información */}
            
            <Table striped bordered hover size="sm">
                <thead>
                    <tr id="headerInfo">
                        <th>Nombre Trabajador</th>
                        <th>Rut</th>
                    </tr>
                </thead>
                
                {<tbody>
                    {
                        trabajadores.map(
                            trabajador =>
                                //let rutView = trabajador.rut;
                                <tr id="info" onClick={()=>DetailInput(trabajador.rut)} key={trabajador.rut}>
                                    <td >{trabajador.nombres} {trabajador.apellidoPaterno} {trabajador.apellidoMaterno}</td>
                                    <td >{trabajador.rut.slice(0,trabajador.rut.length-1)+"-"+verificador(trabajador.rut.slice(0,trabajador.rut.length-1))}</td>
                                </tr>
                            )

                        }
                </tbody> }
            </Table >
            {(estado&&cargas.length!==0&&
            <div>
                no tienes cargas
            </div>) && 
            <div>
                <select>
                    {empleadores.map(empleador=>(
                        <option key={empleador.rut}>{empleador.razonSocial}</option>
                    ))}    
                </select>
                <select>
                {cargas.map(carga=>(
                        <option key={carga.rut}>{carga.nombres}</option>
                        
                    ))}  
                </select>
                <select>
                {periodo.map(per=>(
                    <option key={per.rut}>{per.nombre}</option>
                ))}
                </select>
                <button onClick={()=>Consultar(rut)}>Consultar</button>                    
            </div>
            }
        </div>
    )
}

export default RemunerationComponent;
