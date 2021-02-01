import React, { Component } from 'react';
import UsuariosService from '../../api/UsuariosService';
import { Table } from 'react-bootstrap'

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuariosRoles: []
        }

    }

    //Cuando carga la página carga los datos.
    componentDidMount() {
        console.log('did')
        UsuariosService.retornaRolUsuario()
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Rol</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default WelcomeComponent;