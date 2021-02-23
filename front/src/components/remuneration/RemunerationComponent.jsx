import Title from '../reuseComponent/Title';
import useGetdata from '../hooks/useGetdata';
import { Table} from 'react-bootstrap';
import verificador  from 'verificador-rut';
import EnterprisesService from '../../api/EnterprisesService';
import {useState} from 'react';
import SelectorRem from './SelectorRem';
import Estado from './Estado';
const RemunerationComponent = () => {
    const [cargas,setCargas] = useState([]);
    const [empleadores,setEmpleadores] = useState([]);
    var [estado, setEstado] = useState(false);
    const [periodo,setPeriodo] = useState([]);

    const API_TRABAJADOR = '/private/trabajador';
    const trabajadores = useGetdata(API_TRABAJADOR);
    
    
    
    // //Esta funcionalidad lo que busca es traer las cargas, y los empleadores.
    // const DetailInput = async(rut) =>{
    //     setEstado(true);
        
    //     try {
    //         const response = await EnterprisesService.returnGet(`/private/trabajador/${rut}/cargas`);
    //         const response_empleador = await EnterprisesService.returnGet(`/private/trabajador/${rut}/empleador`);
    //         const response_periodo = await EnterprisesService.returnGet('/private/periodo');

    //         setCargas(response.data);
    //         setEmpleadores(response_empleador.data);
    //         setPeriodo(response_periodo.data);

    //     } catch (error) {
    //         console.log(error);
    //     }

    // }
    // console.log(cargas);
    // console.log(empleadores);
    // console.log(periodo);

    return (
        <Estado.Provider value={{estado,setEstado}}>
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
                <SelectorRem trabajadores={trabajadores}/>
                {/* <tbody>
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
                </tbody> */}
            </Table >
            {estado && <div>hola</div>}
        </div>
        </Estado.Provider>



    )
}

export default RemunerationComponent;