import React, { Component } from 'react';

import { Table } from 'react-bootstrap'
import './Management.css'
import ApiService from '../../api/EnterprisesService';

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuariosRoles: []
        }
        this.GetDataUsers = this.GetDataUsers.bind(this)

    }

    //Cuando carga la página carga los datos.
    componentDidMount() {
        this.GetDataUsers();
        
    }

    GetDataUsers() {
        ApiService.returnGet('/private/users')
            .then(response => {
                this.setState({
                    usuariosRoles: response.data

                })
                
            })
            .catch(error => console.log(error))
    }



    render() {
        return (
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.usuariosRoles.map(
                            user =>
                                <tr key={user.userName}>
                                    <td >{user.userName}</td>
                                    <td >{user.roles[0]}</td>
                                </tr>
                        )

                    }
                </tbody>
            </Table>
        )
    }
}

export default WelcomeComponent;