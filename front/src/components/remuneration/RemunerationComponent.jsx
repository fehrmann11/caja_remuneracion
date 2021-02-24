import Title from '../reuseComponent/Title';
import useGetdata from '../hooks/useGetdata';
import { Table } from 'react-bootstrap';
import verificador from 'verificador-rut';
import EnterprisesService from '../../api/EnterprisesService';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Select from 'react-select';




const RemunerationComponent = () => {
    const [cargas, setCargas] = useState([]);
    const [empleadores, setEmpleadores] = useState([]);
    var [estado, setEstado] = useState(false);
    const [periodos, setPeriodos] = useState([]);
    //formulario
    const [rut, setRut] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [empleador, setEmpleador] = useState('');
    const [carga, setCarga] = useState([]);


    const [rutCarga, setRutCarga] = useState('');
    const [rutEmpleador, setRutEmpleador] = useState('');
    const [unicoPeriodo, setUnicoPeriodo] = useState('');

    const [remuneracion,setRemuneracion] = useState([]);

    const [estadoConsulta,setEstadoConsulta] = useState(false);

    //let history = useHistory();

    const API_TRABAJADOR = '/private/trabajador';
    const trabajadores = useGetdata(API_TRABAJADOR);




    //Esta funcionalidad lo que busca es traer las cargas, y los empleadores.
    const DetailInput = async (rut) => {
        setEstado(true);
        setRut(rut);
        setEstadoConsulta(false);
        setRutCarga('');
        setRutEmpleador('');
        setUnicoPeriodo('')




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
    useEffect(() => {
        if (cargas.length !== 0) {
            let c = cargas.map(d => ({
                "value": d.rut,
                "label": d.nombres + " " + d.apellidoPaterno + " " + d.apellidoPaterno
            }));
            let e = empleadores.map(d => ({
                "value": d.rut,
                "label": d.razonSocial
            }));
            let p = periodos.map(d => ({
                "value": d.id,
                "label": d.nombre
            }))
            setCarga(c);
            setEmpleador(e);
            setPeriodo(p);
        }
    }, [cargas, empleadores, periodos])




    //función que muestra la remuneración....
    const onSubmit = async() => {
        if(rutCarga!=='' && rutEmpleador!=='' && unicoPeriodo!==''){
            try {
                const consulta_remuneracion = await EnterprisesService.returnGet(`/private/remuneracion/carga/${rutCarga}/trabajador/${rut}/empleador/${rutEmpleador}/periodo/${unicoPeriodo}`);
                setRemuneracion(consulta_remuneracion.data);
                setEstado(false);         
                setEstadoConsulta(true);   
    
            } catch (error) {
                console.log(error);
            }
        }else{
            console.log("mas tranquilo cerebrito")
        }
        
        console.log(rut,rutCarga,rutEmpleador,unicoPeriodo);

    }

    const handleChangeCarga = (e) => {
        setRutCarga(e.value);

    }
    const handleChangeEmpleador = (e) => {
        setRutEmpleador(e.value);

    }

    const handleChangePeriodo = (e) => {
        setUnicoPeriodo(e.value);

    }

    console.log(remuneracion);

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
            {(estado && <div>no tienes cargas</div> && cargas.length !== 0) &&
                <div>
                    <Title titulo={"Consulta de remuneración"} />
                    <Select options={carga} onChange={handleChangeCarga} />
                    <Select options={empleador} onChange={handleChangeEmpleador} />
                    <Select options={periodo} onChange={handleChangePeriodo} />
                    <button onClick={onSubmit}>Consultar</button>
                </div>}
            {
                estadoConsulta &&
                <div className="contenedor">
                <div className="items">
                      <div className="items-head">
                          <p>{remuneracion.id.trabajador.nombres} {remuneracion.id.trabajador.apellidoPaterno} {remuneracion.id.trabajador.apellidoMaterno}</p>
                          <hr />
                      </div>
                      <div className="items-body">
                          <div className="itemss-body-content">
                              <span><strong>Empresa: </strong>{remuneracion.id.empleador.razonSocial}</span>
                          </div>
                          <div className="itemss-body-content">
                              <span><strong>Carga: </strong>{remuneracion.id.carga.nombres} {remuneracion.id.carga.nombres} {remuneracion.id.carga.nombres}</span>
                          </div>
                          <div className="itemss-body-content">
                              <span><strong>Período: </strong>{remuneracion.id.periodo.nombre}</span>
                          </div>
                          <div className="itemss-body-content">
                              <span><strong>Estado:  </strong>{remuneracion.estado}</span>
                          </div>
                          <div className="itemss-body-content">
                              <span><strong>Monto: </strong>${remuneracion.monto}</span>
                          </div>
                      </div>
                  </div>
              </div>
                // <div className="container">
                //     <ul>
                //         <li>Nombre Empleador: {remuneracion.id.empleador.razonSocial}</li>
                //         <li>Nombre Carga: {remuneracion.id.carga.nombres} {remuneracion.id.carga.nombres} {remuneracion.id.carga.nombres}</li>
                //         <li>Período: {remuneracion.id.periodo.nombre} </li>
                //         <li>Estado: {remuneracion.estado}</li>
                //         <li>Monto:${remuneracion.monto}</li>
                //     </ul>

                // </div>
            }
        </div>
    )
}

export default RemunerationComponent;
