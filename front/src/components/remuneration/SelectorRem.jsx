
import Selector from './Selector';
const SelectorRem = ({trabajadores}) => {
    console.log(trabajadores);

    return (
        <tbody>
            {
                trabajadores.map(
                    trabajador =>(
                        <Selector key={trabajador.rut} trabajador={trabajador}/> 
                    )
                )

            }
        </tbody>
    )

}

export default SelectorRem;