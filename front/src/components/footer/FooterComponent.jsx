import React, { Component } from 'react';
import './FooterComponent.css'
//import { Modal, Button} from 'react-bootstrap'
class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">Copyright © 2021 Todos los derechos reservados</span>
            </footer>
        )
    }
}

export default FooterComponent;