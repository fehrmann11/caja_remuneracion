import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import SecurityService from '../../api/SecurityService'
import { Link } from 'react-router-dom'
import './HeaderComponent.css'
import AuthenticationService from '../Authentication/AuthenticationService'

class HeaderComponent extends Component {
    render() {
        //esta variable muestra la información si esta logeado
        const isUserLoggedIn = SecurityService.isUserLoggedIn();
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand><Link className="navbar-brand" to="/">VASS</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {isUserLoggedIn && <Link className="nav-link" to="/management" >Administración</Link> }
                        {isUserLoggedIn && <NavDropdown title="Gestión" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Gestión Empresas</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">Gestión Trabajadores</NavDropdown.Item>
                        </NavDropdown>}
                        {isUserLoggedIn && <Nav.Link href="#pricing">Remuneraciones </Nav.Link>}
                        {isUserLoggedIn && <NavDropdown title="Reportes" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Información de remuneraciones</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">Historial de reportes</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">Consumos externos</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">Reporte mensual</NavDropdown.Item>
                        </NavDropdown>}
                        {isUserLoggedIn && <Nav.Link href="#pricing2">API</Nav.Link>}
                    </Nav>
                    <Nav>
                        {isUserLoggedIn && <Nav.Link href="/" onClick={AuthenticationService.logout}>Cerrar sesión</Nav.Link> 
      }
                        {!isUserLoggedIn && 
                            <Link  to="/login" className="nav-link"> Iniciar sesión </Link>
      }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    }
}

export default withRouter(HeaderComponent);