import { useRouteMatch } from 'react-router-dom';
import EnterprisesService from '../../api/EnterprisesService';
import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
const RemunerationForm = () => {
    const match = useRouteMatch('/remuneration/:rut/:rutEmpleador/:rutCarga/:periodo');
    let { rut, rutEmpleador, rutCarga, periodo } = match.params;
    const [bol, setbol] = useState(true);
    const [monto] = useState('');
    const [estado] = useState(0);
    let history = useHistory();


    const Consultar = async () => {
        try {
            const consulta_remuneracion = await EnterprisesService.returnGet(`/private/remuneracion/carga/${rutCarga}/trabajador/${rut}/empleador/${rutEmpleador}/periodo/${periodo}`)
            console.log(consulta_remuneracion.data)

        } catch (error) {
            alert("Este trabajador no tiene remuneraciones para este período")
            console.log(error);
        }
    }

    const Agregar = () => {
        setbol(false);
        console.log("hola")
    }

    //función para enviar un formulario
    const onSubmit = (values) => {
        console.log(values);

        //crear
        // let carga_rut_carga;
        // let trabajador_rut_trabajador;
        // let periodo_idperiodo ;
        // let empleador_rut_empleador;

        EnterprisesService.create('/private/remuneracion', {
            carga_rut_carga: values.rutCarga,
            trabajador_rut_trabajador: values.rut,
            periodo_idperiodo: values.periodo,
            monto: values.monto,
            estado:values.estado,
            empleador_rut_empleador:values.rutEmpleador
        }).then(() => {
            alert("Ha sido creado con exito")
            history.push(`/remuneration`)
        })
    }

    return (<div>
        {rut} {rutEmpleador} {rutCarga} {periodo}
        <button onClick={Consultar}>Consultar</button>
        {bol && <button onClick={Agregar}>Agregar</button>}
        {!bol &&
            <div>
                <Formik
                    initialValues={{
                        rut,
                        rutCarga,
                        rutEmpleador,
                        periodo,
                        monto,
                        estado
                    }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}

                >{/*o
                validate={validate}
                validationSchema={SignupSchema}
                 */}

                    {
                        () => (
                            <div className="form">
                                <Form>
                                    <div className="col-md-12">
                                        <label className="form-label">Monto</label>
                                        <Field placeholder="Monto (ejemplo:100000) *" type="text" name="monto" className="field" required />
                                        {/*errors.razonSocial && touched.razonSocial ? <div className="alert alert-danger">{errors.razonSocial}</div> : null*/}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Estado</label>
                                        <br />

                                        <Field as="select" name="estado">
                                            <option value="0">Cerrado</option>
                                            <option value="1">Abierto</option>

                                        </Field>
                                    </div>
                                    <div className="container" style={{ marginLeft: '35%' }}>
                                        <Button type="submit">Save</Button>
                                    </div>
                                </Form>
                            </div>

                        )}

                </Formik>
            </div>}
    </div>)
}

export default RemunerationForm;