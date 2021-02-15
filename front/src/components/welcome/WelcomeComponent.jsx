import React, {useState,useEffect } from 'react';

import { Table } from 'react-bootstrap'
import './Management.css'
import ApiService from '../../api/EnterprisesService';



const WelcomeComponent = () =>{
    const [usuariosRoles,setUsuariosRoles] = useState([]);

    const GetDataUsers = () =>{
        ApiService.returnGet('/private/users')
        .then(response => {
            setUsuariosRoles(response.data)
        })
        .catch(error => console.log(error))
    }

    useEffect(()=>{
        GetDataUsers();
    },[])

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
                    usuariosRoles.map(
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

export default WelcomeComponent;