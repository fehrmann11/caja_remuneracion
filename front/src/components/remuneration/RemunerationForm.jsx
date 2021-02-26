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
        /*{
    "rutCarga":"123456789",
    "rutTrabajador":"124316170 ",
    "rutEmpleador":"188881025",
    "idPeriodo":2,
    "monto": 4000
    
} */

        EnterprisesService.create('/private/remuneracion', {
            rutCarga: values.rutCarga,
            rutTrabajador: values.rut,
            rutEmpleador: values.rutEmpleador,
            idPeriodo: values.periodo,
            monto:values.monto,
            
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
                        monto
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