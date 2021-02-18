import useGetdata from '../hooks/useGetdata';
import { Table, Button} from 'react-bootstrap';
import EnterprisesService from '../../api/EnterprisesService';
import { useState,useRef, useCallback } from 'react';
import Title from '../reuseComponent/Title';
import Search from './Search';


const WorkerComponent = () => {

    const [information, setInformation] = useState('');
    const [textBuscar, setTextBuscar] = useState('');
    const searchInput = useRef(null);
    const [visible, setVisible] = useState(false);
    const API = '/private/trabajador';
    //const API2 = '/private/trabajador/18.888.102-5/cargas'
    const workers = useGetdata(API);
 




    //mostrar la información de la empresa al hacer clic
    const informationWorker = (id) => {
        EnterprisesService.returnGet(`/private/trabajador/${id}`)
            .then(response => {
                setInformation(response.data);
                setVisible(true);
            })
    }

    //llama para hacer el filtro 
    const handleSearch = useCallback(
        () => {
            setTextBuscar(searchInput.current.value)
        },
        [],
    )
    

    return (
        <div className="container">
            <Title titulo="trabajadores" />

        {/*buscador */}
        <Search search={textBuscar} ruta="workerManagement" searchInput={searchInput} handleSearch={handleSearch}/>

        {/*información */}
        <Table striped bordered hover size="sm">
            <thead>
                <tr id="headerInfo">
                    <th>Nombre Trabajador</th>
                    <th>Rut</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {
                    workers.map(
                        worker =>
                            <tr id="info" onClick={() => informationWorker(worker.rut)} key={worker.rut}>
                                <td >{worker.nombres} {worker.apellidoPaterno} {worker.apellidoMaterno}</td>
                                <td >{worker.rut}</td>
                                <td><Button variant="outline-warning">Editar</Button></td>
                                <td><Button variant="outline-danger">Eliminar</Button></td>
                            </tr>
                    )

                }
            </tbody>
        </Table >
        {visible &&
                
                <div className="contenedor">
                  
                  <div className="items">
                        <div className="items-head">
                            <p>{information.nombres} {information.apellidoPaterno} {information.apellidoMaterno}</p>
                            <hr />
                        </div>
                        <div className="items-body">
                            <div className="itemss-body-content">
                                <span><strong>Rut: </strong>{information.rut}</span>
                            </div>
                            <div className="itemss-body-content">
                                <span><strong>Celular: </strong>{information.celular}</span>
                            </div>
                            <div className="itemss-body-content">
                                <span><strong>Dirección:  </strong>{information.direccion}</span>
                            </div>
                            <div className="itemss-body-content">
                                <span><strong>Email: </strong>{information.email}</span>
                            </div>
                            <div className="itemss-body-content">
                                <strong>Tramo: </strong> {information.tramo}
                            </div>
                            <div className="itemss-body-content">
                                <span><strong>Teléfono: </strong>{information.telefono} </span>
                            </div>
                            
                        </div>
                    </div>
                </div>

            }
        </div>

    )
}

export default WorkerComponent;