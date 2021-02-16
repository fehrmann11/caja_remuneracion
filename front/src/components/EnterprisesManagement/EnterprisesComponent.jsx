import React,{ useState, useEffect } from 'react';
import EnterprisesService from '../../api/EnterprisesService';
import './enterprise.css';
import {useHistory} from 'react-router-dom'
import { Form, FormControl, Button, Navbar, Nav, Table } from 'react-bootstrap'

//import componentes reutilizables
import Title from '../reuseComponent/Title'
// import TableInfo from '../reuseComponent/TableInfo'

//buscar por ... nombre, buscar por rut ... 
const EnterprisesComponent = () => {
    const [enterprises,setEnterprises] = useState([]);
    const [informationT,setInformationT] = useState([]);
    const [visible,setVisible] = useState(false);
    const [textBuscar,setTextBuscar] = useState("");
    const [enterprisesOld,setEnterprisesOld] = useState([]);
    const [message,setMessage] = useState(null);
    let history = useHistory();
    

    const handleChange = event =>{
        setTextBuscar(event.target.value);
    }



    //mostrar la información de la empresa al hacer clic
    const information = (id) => {
        EnterprisesService.returnGet(`/private/empleador/${id}`)
        .then(response=>{
            setInformationT(response.data);
            setVisible(true);
        })
    }

    //función que obtiene el array de empresas
    const GetEnterprises = () =>{
        EnterprisesService.returnGet('/private/empleador')
            .then(response => {
                setEnterprises(response.data);
                setEnterprisesOld(response.data);
            })
            .catch(error => console.log(error))
    }

    //para llamar a la API
    useEffect(()=>{
        GetEnterprises();
    },[])

    //use efect del buscador
    useEffect(()=>{
        if( Number.isInteger(parseInt(textBuscar[0])) ){
            EnterprisesService.returnGet(`/private/empleador/busqueda?idRut=${textBuscar}`)
        .then(response=>{
            let newData = response.data
            setEnterprises(newData)
        })
        }
        //Si es nombre de la empresa
        else if(textBuscar===''){
            setEnterprises(enterprisesOld);
        }
        else{
            EnterprisesService.returnGet(`/private/empleador/busqueda?name=${textBuscar}`)
            .then(response=>{
                let newData = response.data
                setEnterprises(newData)
            })
        }
    },[textBuscar,enterprisesOld])

    //función que elimina una empresa

    const deleteEnterprise = (id) =>{
        
        EnterprisesService.delete(`/private/empleador/${id}`)
        .then(
            () => {
                let mensaje = alert(`Se ha eliminado la empresa ${id} de forma correcta`)
                setMessage(mensaje)
                GetEnterprises();
            }
        )
    }

    //función que actualiza una empresa
    const updateEnterprise = (id) =>{
        history.push(`/enterprisesManagement/${id}`)
    }

    //función que agrega una empresa
    const addEnterprise = ()=>{
        history.push(`/enterprisesManagement/-1`)
    }


    let vis = visible;
    let inf = informationT;

    return (
        <div className="container">
            <Title titulo="empleadores"/>
            
            <div id="buscador">
                <Navbar bg="light" expand="lg">


                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Button onClick={addEnterprise} variant="outline-primary">agregar empleador</Button>
                        </Nav>
                        <Form inline>
                            <FormControl name="text" value={textBuscar} onChange={handleChange} type="text" placeholder="Buscar" className="mr-sm-2" />
                           
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <div style={{marginTop:'2%'}}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr id="headerInfo">
                            <th>Nombre Empresa</th>
                            <th>Rut</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    enterprises.map(
                        enterprise =>
                            <tr  id="info" onClick={() =>information(enterprise.rut)} key={enterprise.rut}>
                                <td >{enterprise.razonSocial}</td>
                                <td >{enterprise.rut}</td>
                                <td><Button onClick={()=>updateEnterprise(enterprise.rut)} variant="outline-warning">Editar</Button></td>
                                <td><Button onClick={()=>deleteEnterprise(enterprise.rut)} variant="outline-danger">Eliminar</Button></td>
                            </tr>
                    )

                    }
                    </tbody>
                </Table >
            </div>
            {message && <div className="alert alert-success">{message}</div>}
            {/* <div style={{marginTop:'2%'}}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr id="headerInfo">
                            <th>Nombre Empresa</th>
                            <th>Rut</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.enterprises.map(
                        (enterprise,key) =>{
                            return <TableInfo value={enterprise} myKey={key} />
                        }
                        
                            
                    )

                    }
                    </tbody>
                </Table >
            </div>
               */}
            
        
            {vis && 
            <div>
                <ul>
                    <li>{inf.razonSocial}</li>
                    <li>{inf.rut}</li>
                    <li>{inf.celular}</li>
                    <li>{inf.direccion}</li>
                    <li>{inf.email}</li>
                    <li>{inf.telefono}</li>
                    <li>{inf.tipoEmpleador}</li>
                </ul>
            </div>
            
            }
        </div>
    )


}

export default EnterprisesComponent;