import { Formik, Form, Field } from 'formik';
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import Api from '../../api/EnterprisesService';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';
import verificador from 'verificador-rut';

const EnterprisesForm = () => {
    const match = useRouteMatch('/enterprisesManagement/:id');
    const [rut, setRut] = useState(match.params.id);
    const [razonSocial, setRazonSocial] = useState("");
    const [telefono, setTelefono] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [direccion, setDireccion] = useState("");
    const [tipoEmpleador] = useState("1");
    const [estado, setEstado] = useState(false);
    const [SignupSchema, setSignupSchema] = useState(Yup.object().shape({
        email: Yup.string().max(50,'Limite 50 caracteres').email('Ingrese un correo válido').required('Este campo es obligatorio'),
        telefono: Yup.string().min(4, 'Ingresa un número válido').max(10, 'Número incorrecto').matches(/^([0-9])*$/, 'Solo números y sin espacios').required('Este campo es obligatorio'),
        razonSocial: Yup.string().trim().matches(/^[a-z\s]+$/i, 'solo letras').required('Este campo es obligatorio'),
        celular: Yup.string().min(4, 'Ingresa un número válido').max(10, 'Número incorrecto').matches(/^([0-9])*$/, 'Solo números y sin espacios'),
        direccion: Yup.string().trim()
    }))
    let history = useHistory();

    //función para enviar un formulario
    const onSubmit = (values) => {

        if (estado) {
            //crear un nuevo empleador
            let split = values.rut.split("-");
            let newRut = split[0].concat(split[1])
            console.log(newRut)
            Api.create('/private/empleador', {
                rut: newRut,
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

    //función para validar rut npm install verificador-rut
    const validate = (values) => {
        let errors = {}
        let valor;
        valor = verificador(values.rut)
        if (valor === false) {
            errors.rut = "Este rut es inválido"
        }
        return errors;
    }

    /*este useEffect pregunta si estado es verdadero, 
    si lo es también pone restricciones tanto a rut como a tipo de empleador*/
    useEffect(() => {
        if (estado) {
            setSignupSchema(Yup.object().shape({
                email: Yup.string().email('Ingrese un correo válido').required('Este campo es obligatorio'),
                telefono: Yup.string().min(4, 'Ingresa un número válido').max(10, 'Número incorrecto').matches(/^([0-9])*$/, 'Solo números y sin espacios').required('Este campo es obligatorio'),
                razonSocial: Yup.string().trim().matches(/^[a-z\s]+$/i, 'solo letras').required('Este campo es obligatorio'),
                rut: Yup.string().min(9, 'Rut inválido').max(10, 'Muchos carácteres').required('Este campo es obligatorio'),
                celular: Yup.string().min(4, 'Ingresa un número válido').max(10, 'Número incorrecto').matches(/^([0-9])*$/, 'Solo números y sin espacios'),
                direccion: Yup.string().trim()
            }))

        }
    }, [estado])



    /*Este useEffect pregunta si la id es -1, si lo es rut lo establece en vacío
    y procedemos a crear un nuevo empleador, sino simplemente hacemos la petición
    a la API*/
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
                            <div className="form" >
                                <Form className="row g-3 needs-validation" noValidate>
                                    <div  className="col-md-12">
                                        <label className="form-label">Razón Social</label>
                                        <Field placeholder="Nombre de la empresa *" type="text" name="razonSocial" className="field" required />
                                        {errors.razonSocial && touched.razonSocial ? <div className="alert alert-danger">{errors.razonSocial}</div> : null}
                                    </div>

                                    <div className="col-md-12">
                                        <label className="form-label">Teléfono</label>
                                        <Field type="text" placeholder="Telefono *" name="telefono" className="field" required />
                                        {errors.telefono && touched.telefono ? <div className="alert alert-danger">{errors.telefono}</div> : null}
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Celular</label>
                                        <Field placeholder="Celular" type="text" className="field" name="celular" required />
                                        {errors.celular && touched.celular ? <div className="alert alert-danger">{errors.celular}</div> : null}
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Email</label>
                                        <Field type="text" placeholder="ejemplo: vass@gmail.com * " className="field" name="email" required />
                                        {errors.email && touched.email ? <div className="alert alert-danger">{errors.email}</div> : null}
                                    </div>
                                    <div className="col-md-12">
                                        <label  className="form-label">Dirección</label>
                                        <Field type="text" placeholder="Dirección"  className="field" name="direccion" required />
                                    </div>
                                    {estado &&
                                        <div style={{marginTop:'16px'}} className="row container">
                                            <div className="col-md-6">
                                                <label className="form-label">Rut: </label>
                                                <Field style={{marginLeft:'16px'}} placeholder="ejemplo:12345678-9 *" type="text" className="field" name="rut" />
                                                {errors.rut && touched.rut ? <div className="alert alert-danger">{errors.rut}</div> : null}
                                            </div>
                                            <div className="col-md-6">
                                                <label  className="form-label">Tipo empresa</label>
                                                <br/>
                                                
                                                <Field as="select" name="tipoEmpleador">
                                                    <option value="1">EMPRESA</option>
                                                    <option value="2">INDEPENDIENTE</option>

                                                </Field>
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