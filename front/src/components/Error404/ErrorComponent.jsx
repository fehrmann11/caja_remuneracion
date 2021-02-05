import React, { Component } from 'react';
import './Error.css'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'

class ErrorComponent extends Component {
    render() {
        return (
            <div className="page">
                <div>
                    <h1>Ops algo salío mal</h1>
                    <h2>Error 404</h2>
                </div>
                <div></div>
                <div></div> 
                <Link to="/"><Button variant="primary" size="sm">Vuelve al inicio</Button>{' '}</Link>
            </div>
        )
    }
}

export default ErrorComponent;

