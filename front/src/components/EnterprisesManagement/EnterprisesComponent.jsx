import React, { Component } from 'react';
import EnterprisesService from '../../api/EnterprisesService';
import './enterprise.css';
import { Form, FormControl, Button, Navbar, Nav, Table } from 'react-bootstrap'

class EnterprisesComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            enterprises : [],
            information : [],
            visible :false,
            text: ''
        }

        this.GetEnterprises = this.GetEnterprises.bind(this);
        this.information = this.information.bind(this);
        this.textSearch = this.textSearch.bind(this); 
        this.filter2 = this.filter2.bind(this);
        this.filterOnclick = this.filterOnclick.bind(this);
    }

    //textoSearch: Esta función lo que hace es guardar el texto en el input
    textSearch(event){
        this.setState({
            text : event.target.value
        })
    }

    //función de filtro
    filter2(array, string) {
        return array.filter(RegExp.prototype.test, new RegExp([...string].join('.*'), 'i'));
    }
    //función para filtrar el buscador de empleadores
    filterOnclick(){
        let name = []
        this.state.enterprises.map(enterprisesName => {
            name.push(enterprisesName.razonSocial)
        })
        console.log(typeof (this.state.text))
        //console.log(this.filter(name,this.state.text))
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
                    enterprises : response.data
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        let visible = this.state.visible;
        let inf = this.state.information;
        return (
            <div className="container">
                <h1 className="title">Lista de empleadores</h1>
                <div id="buscador">
                    <Navbar bg="light" expand="lg">


                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Button variant="outline-primary">agregar empleador</Button>
                            </Nav>
                            <Form inline>
                                <FormControl name="text" onChange={this.textSearch} type="text" placeholder="Search" className="mr-sm-2" />
                                <Button onClick={this.filter} variant="outline-success">Search</Button>
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
                    </Table>
                </div>
            
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