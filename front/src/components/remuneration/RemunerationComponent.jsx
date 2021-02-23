import Title from '../reuseComponent/Title';
import useGetdata from '../hooks/useGetdata';
import {  Table } from 'react-bootstrap';
import verificador from 'verificador-rut';
import EnterprisesService from '../../api/EnterprisesService';
import { useEffect, useState,useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik,Form, Field } from 'formik';
import Select from 'react-select';




const RemunerationComponent = () => {
    const [cargas, setCargas] = useState([]);
    const [empleadores, setEmpleadores] = useState([]);
    var [estado, setEstado] = useState(false);
    const [periodos, setPeriodos] = useState([]);
    //formulario
    const [rut, setRut] = useState('');
    const [periodo,setPeriodo] = useState('');
    const [empleador,setEmpleador] = useState('');
    const [carga,setCarga] = useState([]);
    

    const [rutCarga,setRutCarga] = useState('');

    let history = useHistory();

    const API_TRABAJADOR = '/private/trabajador';
    const trabajadores = useGetdata(API_TRABAJADOR);




    //Esta funcionalidad lo que busca es traer las cargas, y los empleadores.
    const DetailInput = async (rut) => {
        setEstado(true);
        setRut(rut);
        


        try {
            const response = await EnterprisesService.returnGet(`/private/trabajador/${rut}/cargas`);
            const response_empleador = await EnterprisesService.returnGet(`/private/trabajador/${rut}/empleador`);
            const response_periodos = await EnterprisesService.returnGet('/private/periodo');
            

            setCargas(response.data);
            setEmpleadores(response_empleador.data);
            setPeriodos(response_periodos.data);

        } catch (error) {
            console.log(error);
        }

    }

 

//https://medium.com/how-to-react/react-select-dropdown-tutorial-using-react-select-51664ab8b6f3
    useEffect(()=>{
        if(cargas.length!==0){
        let c = cargas.map(d=>({
            "value":d.rut,
            "label":d.nombres+" "+d.apellidoPaterno+" "+d.apellidoPaterno
        }))
        setCarga(c);
    }
    },[cargas])




    const onSubmit = (values) =>{
        
        console.log(values);
    }

    const handleChangeCarga = (e)=>{
        setRutCarga(e.value);
       
    }

    console.log(rutCarga);


    // useEffect(()=>{

    // })

    return (

        <div className="container">
            <Title titulo="Remuneraciones" />
            {/*información */}

            <Table striped bordered hover size="sm">
                <thead>
                    <tr id="headerInfo">
                        <th>Nombre Trabajador</th>
                        <th>Rut</th>
                    </tr>
                </thead>

                {<tbody>
                    {
                        trabajadores.map(
                            trabajador =>
                                //let rutView = trabajador.rut;
                                <tr id="info" onClick={() => DetailInput(trabajador.rut)} key={trabajador.rut}>
                                    <td >{trabajador.nombres} {trabajador.apellidoPaterno} {trabajador.apellidoMaterno}</td>
                                    <td >{trabajador.rut.slice(0, trabajador.rut.length - 1) + "-" + verificador(trabajador.rut.slice(0, trabajador.rut.length - 1))}</td>
                                </tr>
                        )

                    }
                </tbody>}
            </Table >
            <Select options={carga}  onChange={handleChangeCarga}/>

            {
                <Formik
                    initialValues={{
                        rut,
                        empleador,
                        carga,
                        periodo
                    }}
                    onSubmit={onSubmit}
                >{() => (
                    <Form>
                        <Title titulo={"Consulta de remuneración"} />
                        {/* <Field as="select" name="empleador">
                            {empleadores.map(emp => (
                                <option key={emp.rut} onChange={()=>handleChange(emp)}>{emp.razonSocial}-{emp.rut}</option>
                            ))}
                        </Field>
                        
                            
                        
                        <Field as="select" name="periodo">
                            {periodos.map(per => (
                                <option key={per.id}>{per.nombre}-{per.id}</option>
                                
                            ))}
                        </Field> */}
                        <button type="submit">Consultar</button>
                    </Form>)}
                </Formik>
            }
        </div>
    )
}

export default RemunerationComponent;
