import { Formik , Form, Field} from 'formik';
import React from 'react'
import {Button} from 'react-bootstrap';

class EnterprisesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            razonSocial: "HMD dd",
            telefono: "232312",
            celular: "992432144",
            email: "hmmmm@gmail.com",
            direccion: "holanda 22221"
        }
    }
    render() {
        return (
            <div>
                <h1 style={{textAlign:'center'}}>Formulario Empleadores</h1>
                <div className="container">

                    <Formik>
                        {
                            (props) => (
                                <div className="container" >
                                <Form className="row g-3 needs-validation" noValidate>
                                    <div className="col-md-6">
                                        <label  className="form-label">Razón Social</label>
                                        <Field type="text"  name="razonSocial" className="form-control" required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label   className="form-label">Email</label>
                                        <br></br>

                                        <Field type="text" className="form-control" name="email" required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label  className="form-label">Teléfono</label>
                                        <br></br>
                                        <Field type="text"  name="telefono" className="form-control" required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label   className="form-label">Celular</label>
                                        <br></br>
                                       
                                        <Field type="text" className="form-control" name="celular" required/>
                                    </div>
                                    <div  className="col-md-12">
                                            <label style={{marginLeft:'5%'}} className="form-label">Celular</label>
                                        <br></br>
                                       
                                        <Field type="text" style={{marginLeft:'5%'}} className="form-control" name="celular" required/>
                                    </div>
                                    <div className="container" style={{marginLeft:'35%'}}> 
                                    <Button  type="submit">Save</Button>
                                    </div>
                                </Form>
                                </div>
                            )
                        }
                    </Formik>
                </div>

            </div>
        )
    }

}

export default EnterprisesForm;