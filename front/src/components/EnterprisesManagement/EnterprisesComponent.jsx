import React, { Component } from 'react';
import EnterprisesService from '../../api/EnterprisesService';
import './enterprise.css';
import { Form, FormControl, Button, Navbar, Nav, Table } from 'react-bootstrap'

//import componentes reutilizables
import Title from '../reuseComponent/Title'
// import TableInfo from '../reuseComponent/TableInfo'

class EnterprisesComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            enterprises : [],
            information : [],
            visible :false,
            textBuscar: '',
            enterprisesOld:[],
            message:null
        }

        this.GetEnterprises = this.GetEnterprises.bind(this);
        this.information = this.information.bind(this);
        this.deleteEnterprise = this.deleteEnterprise.bind(this);
        this.filter = this.filter.bind(this);
        this.updateEnterprise = this.updateEnterprise.bind(this);
        
    }

  

    //función de filtro en el buscador
    filter(event) {
        
        var text = event.target.value
        
        let rut = ''
        
        this.setState({
            text:text
        })
        //Si es rut
        if( Number.isInteger(parseInt(text[0])) ){
            rut = event.target.value
            text = ''
            
        }
        EnterprisesService.returnGet(`/private/empleador/busqueda?name=${text}&idRut=${rut}`)
        .then(response=>{
        
            
            let newData = response.data
            this.setState({
                enterprises: newData
            })
        })
        
        
    }
    componentDidMount() {
        this.GetEnterprises();
    }

    //mostrar la información de la empresa al hacer clic
    information(id){
        EnterprisesService.returnGet(`/private/empleador/${id}`)
        .then(response=>{
            this.setState({
                information : response.data,
                visible : true
            })
        })
        
    }
    //función que obtiene el array de empresas
    GetEnterprises() {
        EnterprisesService.returnGet('/private/empleador')
            .then(response => {
                this.setState({
                    enterprises : response.data,
                    
                    enterprisesOld: response.data
                })
            })
            .catch(error => console.log(error))
    }
    
   

    //función que elimina una empresa
    deleteEnterprise(id){
        
        EnterprisesService.delete(`/private/empleador/${id}`)
        .then(
            response => {
                this.setState({
                    message: alert(`Se ha eliminado la empresa ${id} de forma correcta`) 
                });
                this.GetEnterprises();
            }
        )
        
    }

    //función que actualiza una empresa
    updateEnterprise(id){
        console.log(id)
        this.props.history.push(`/enterprisesManagement/${id}`)
    }

    render() {
        let visible = this.state.visible;
        let inf = this.state.information;
        return (
            <div className="container">
                <Title titulo="empleadores"/>
                
                <div id="buscador">
                    <Navbar bg="light" expand="lg">


                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Button variant="outline-primary">agregar empleador</Button>
                            </Nav>
                            <Form inline>
                                <FormControl name="text" value={this.state.text} onChange={(text) => this.filter(text)} type="text" placeholder="Buscar" className="mr-sm-2" />
                               
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
                        this.state.enterprises.map(
                            enterprise =>
                                <tr  id="info" onClick={() =>this.information(enterprise.rut)} key={enterprise.rut}>
                                    <td >{enterprise.razonSocial}</td>
                                    <td >{enterprise.rut}</td>
                                    <td><Button onClick={()=>this.updateEnterprise(enterprise.rut)} variant="outline-warning">Editar</Button></td>
                                    <td><Button onClick={()=>this.deleteEnterprise(enterprise.rut)} variant="outline-danger">Eliminar</Button></td>
                                </tr>
                        )

                        }
                        </tbody>
                    </Table >
                </div>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
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
                
            
                {visible && 
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

}

export default EnterprisesComponent;