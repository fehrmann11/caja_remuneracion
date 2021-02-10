import React, { Component } from 'react';
import EnterprisesService from '../../api/EnterprisesService';
import './enterprise.css';
import { Form, FormControl, Button, Navbar, Nav, Table } from 'react-bootstrap'

//import componentes reutilizables
import Title from '../reuseComponent/Title'
import TableInfo from '../reuseComponent/TableInfo'

class EnterprisesComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            enterprises : [],
            information : [],
            visible :false,
            textBuscar: '',
            enterprisesOld:[]
        }

        this.GetEnterprises = this.GetEnterprises.bind(this);
        this.information = this.information.bind(this);
   
        this.filter = this.filter.bind(this);
        
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
                                <FormControl name="text" value={this.state.text} onChange={(text) => this.filter(text)} type="text" placeholder="Search" className="mr-sm-2" />
                               
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
                            </tr>
                        </thead>
                        <tbody>
                        {
                        this.state.enterprises.map(
                            enterprise =>
                                <tr  id="info" onClick={() =>this.information(enterprise.rut)} key={enterprise.rut}>
                                    <td >{enterprise.razonSocial}</td>
                                    <td >{enterprise.rut}</td>
                                </tr>
                        )

                        }
                        </tbody>
                    </Table >
                </div>
                
                <TableInfo array={[this.state.enterprises]}/>
                
            
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