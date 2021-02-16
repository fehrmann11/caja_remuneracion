import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import Api from '../../api/EnterprisesService';
import {useHistory,useRouteMatch} from 'react-router-dom';
import * as Yup from 'yup';

const EnterprisesForm = () => {
    const match = useRouteMatch('/enterprisesManagement/:id');
    const [rut, setRut] = useState(match.params.id);
    const [razonSocial, setRazonSocial] = useState("");
    const [telefono, setTelefono] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [direccion, setDireccion] = useState("");
    const [tipoEmpleador] = useState("");
    const [estado, setEstado] = useState(false);
    let history = useHistory();

    //función para enviar un formulario
    const onSubmit = (values) => {

        if (estado) {
            //crear un nuevo empleador
            Api.create('/private/empleador', {
                rut: values.rut,
                razonSocial: values.razonSocial,
                telefono: values.telefono,
                celular: values.celular,
                email: values.email,
                direccion: values.direccion,
                tipoEmpleador: values.tipoEmpleador
            }).then(() => {
                history.push(`/enterprisesManagement`)
            })
        }
        //editar un empleador
        else {
            Api.update(`/private/empleador/${rut}`, {
                razonSocial: values.razonSocial,
                telefono: values.telefono,
                celular: values.celular,
                email: values.email,
                direccion: values.direccion
            })
                .then(() => {
                    history.push(`/enterprisesManagement`)
                })
        }


    }

    //función para validar datos del formulario (https://jasonwatmore.com/post/2019/04/10/react-formik-form-validation-example)
    const validate = (values) => {
        let errors = {}
        if (!values.razonSocial) {
            errors.razonSocial = 'Agrega una razón social'
        } else if (values.razonSocial.length < 5) {
            errors.razonSocial = "Agrega una razón social válida"
        }

        return errors;
    }

    //otra validación
    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
      });


    useEffect(() => {
        if (rut === "-1") {
            setEstado(true);
            setRut("")

        } else {
            //recuperar la data para ponerla en el formulario
            const getData = () => {
                Api.returnGet(`/private/empleador/${rut}`)
                    .then(response => {
                        setRazonSocial(response.data.razonSocial);
                        setTelefono(response.data.telefono);
                        setCelular(response.data.celular);
                        setEmail(response.data.email);
                        setDireccion(response.data.direccion);
                    }
                    )
            }
            getData();
        }
    }, [estado, rut])


    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Formulario Empleadores</h1>
            <div className="container">

                <Formik
                    initialValues={{
                        razonSocial,
                        telefono,
                        celular,
                        email,
                        direccion,
                        rut,
                        tipoEmpleador
                    }}
                    onSubmit={onSubmit}
                    validate={validate}
                    validationSchema={SignupSchema}
                    enableReinitialize={true}

                >
                    {
                        ({ errors, touched }) => (
                            <div className="container" >
                                <Form className="row g-3 needs-validation" noValidate>
                                    <div style={{ marginLeft: '5%' }} className="col-md-12">
                                        <label className="form-label">Razón Social</label>
                                        <br></br>
                                        <Field type="text" name="razonSocial" className="form-control" required />
                                        <ErrorMessage name="razonSocial" component="div" className="alert alert-danger" />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="form-label">Teléfono</label>
                                        <br></br>
                                        <Field type="text" name="telefono" className="form-control" required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Celular</label>
                                        <br></br>

                                        <Field type="text" className="form-control" name="celular" required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Email</label>
                                        <br></br>

                                        <Field type="email" className="form-control" name="email" required />
                                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                                    </div>
                                    <div className="col-md-12">
                                        <label style={{ marginLeft: '5%' }} className="form-label">Dirección</label>
                                        <br></br>

                                        <Field type="text" style={{ marginLeft: '5%' }} className="form-control" name="direccion" required />
                                    </div>
                                    {estado &&
                                        <div className="row container">
                                            <div className="col-md-6">
                                                <label className="form-label">Rut de la empresa</label>
                                                <br />
                                                <Field type="text" className="form-control" name="rut" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Tipo empresa</label>
                                                <br />
                                                <Field type="text" className="form-control" name="tipoEmpleador" />
                                            </div>
                                        </div>
                                    }
                                    <div className="container" style={{ marginLeft: '35%' }}>
                                        <Button type="submit">Save</Button>
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


export default EnterprisesForm;