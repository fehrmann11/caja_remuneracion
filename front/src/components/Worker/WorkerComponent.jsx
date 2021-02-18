import useGetdata from '../hooks/useGetdata';
const WorkerComponent = () => {
    
    const API = '/private/trabajador';
    const [worker,workerOld] = useGetdata(API); 

    console.log(worker);
    console.log(workerOld);
 
    return (<div>hola soy worker</div>)
} 

export default WorkerComponent;