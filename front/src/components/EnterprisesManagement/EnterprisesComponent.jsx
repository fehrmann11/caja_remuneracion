import React, { Component } from 'react';
import EnterprisesService from '../../api/EnterprisesService';

class EnterprisesComponent extends Component{
    constructor(props){
        super(props)

        this.GetEnterprises = this.GetEnterprises.bind(this);
    }

    componentDidMount(){
        this.GetEnterprises();
    }

    GetEnterprises(){
        EnterprisesService.returnEnterprises()
        .then(response =>{
            console.log(response.data)
        })
        .catch(error => console.log(error))
    }

    render(){
        return(<div>holaa</div>)
    }

}

export default EnterprisesComponent;