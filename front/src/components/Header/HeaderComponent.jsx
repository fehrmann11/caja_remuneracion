import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

class HeaderComponent extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">VASS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Administración</Nav.Link>
                        <NavDropdown title="Gestión" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Gestión Empresas</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">Gestión Trabajadores</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#pricing">Remuneraciones </Nav.Link>
                        <NavDropdown title="Reportes" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Información de remuneraciones</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">Historial de reportes</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">Consumos externos</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">Reporte mensual</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#pricing">API</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Nombre Usuario</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Cerrar sesión
      </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    }
}

export default withRouter(HeaderComponent);