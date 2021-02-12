import { Formik , Form, Field, ErrorMessage} from 'formik';
import React from 'react'
import {Button} from 'react-bootstrap';
import Api from '../../api/EnterprisesService';

class EnterprisesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            razonSocial: "",
            telefono: "",
            celular: "",
            email: "",
            direccion: ""
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.getData = this.getData.bind(this)
    }
    //función para enviar un formulario
    onSubmit(values){
        console.log(values)
    }

    //función para validar datos del formulario (https://jasonwatmore.com/post/2019/04/10/react-formik-form-validation-example)
    validate(values){
        let errors = {}
        if(!values.razonSocial){
            errors.razonSocial = 'Agrega una razón social'
        }else if(values.razonSocial.length<5){
            errors.razonSocial = "Agrega una razón social válida"
        }
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
            errors.email = "test error";
        }

        return errors;
    }

    componentDidMount(){
        this.getData();
    }

    //recuperar la data para ponerla en el formulario
    getData(){
        Api.returnGet(`/private/empleador/${this.state.id}`)
        .then(response => this.setState({
            razonSocial: response.data.razonSocial,
            telefono: response.data.telefono,
            celular: response.data.celular,
            email: response.data.email,
            direccion: response.data.direccion

        }))
    }

    render() {
        let {razonSocial,telefono,celular,email,direccion} = this.state;
        return (
            <div>
                <h1 style={{textAlign:'center'}}>Formulario Empleadores</h1>
                <div className="container">

                    <Formik
                    initialValues={{
                        razonSocial,
                        telefono,
                        celular,
                        email,
                        direccion
                    }}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    enableReinitialize={true}
                    
                    >
                        {
                            (props) => (
                                <div className="container" >
                                <Form className="row g-3 needs-validation" noValidate>
                                    <div style={{marginLeft:'5%'}} className="col-md-12">
                                        <label  className="form-label">Razón Social</label>
                                        <br></br>
                                        <Field type="text"  name="razonSocial" className="form-control" required/>
                                        <ErrorMessage name="razonSocial" component="div" className="alert alert-danger"/>
                                    </div>
                                    
                                    <div className="col-md-4">
                                        <label  className="form-label">Teléfono</label>
                                        <br></br>
                                        <Field type="text"  name="telefono" className="form-control" required/>
                                    </div>
                                    <div className="col-md-4">
                                        <label   className="form-label">Celular</label>
                                        <br></br>
                                       
                                        <Field type="text" className="form-control" name="celular" required/>
                                    </div>
                                    <div className="col-md-4">
                                        <label   className="form-label">Email</label>
                                        <br></br>

                                        <Field type="text" className="form-control" name="email" required/>
                                    </div>
                                    <div  className="col-md-12">
                                            <label style={{marginLeft:'5%'}} className="form-label">Dirección</label>
                                        <br></br>
                                       
                                        <Field type="text" style={{marginLeft:'5%'}} className="form-control" name="direccion" required/>
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