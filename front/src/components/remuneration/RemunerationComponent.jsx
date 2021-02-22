import Title from '../reuseComponent/Title';
import useGetdata from '../hooks/useGetdata';
import { Table} from 'react-bootstrap';
import verificador  from 'verificador-rut';
import EnterprisesService from '../../api/EnterprisesService';
import {useState} from 'react';
const RemunerationComponent = () => {
    const [cargas,setCargas] = useState([]);

    const API_TRABAJADOR = '/private/trabajador';
    const trabajadores = useGetdata(API_TRABAJADOR);
    
    
    const DetailInput = async(rut) =>{
        
        try {
            const response = await EnterprisesService.returnGet(`/private/trabajador/${rut}/cargas`);
            setCargas(response.data)
        } catch (error) {
            console.log(error);
        }
        

        // try{
        // EnterprisesService.returnGet(`/private/trabajador/${rut}/cargas`)
        //     .then(response => {
        //         setCargas(response.data);
        //     }
        // }catch(err){
        //     console.error(err);
        // }
           
        //console.log(cargas);
    }
    console.log(cargas);

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
                <tbody>
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
                </tbody>
            </Table >
        </div>



    )
}

export default RemunerationComponent;