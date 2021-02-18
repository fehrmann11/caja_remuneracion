import { useState, useEffect } from 'react';
import EnterprisesService from '../../api/EnterprisesService';

const useGetdata = url => {

    const [getData, setGetData] = useState([]);
    const [getDataOld, setDataOld] = useState([]);

    useEffect(() => {
        EnterprisesService.returnGet(url)
            .then(response => {
                setGetData(response.data);
                setDataOld(response.data);
            })
            .catch(error => console.log(error))
    }, [url]);
    return [getData,getDataOld];
};

export default useGetdata;