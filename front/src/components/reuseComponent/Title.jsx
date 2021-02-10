import React, { Component } from 'react';
import './reuseComponent.css'

class Title extends Component{
    constructor(props){
        super(props)
        this.state={
            titulo:props.titulo
        }
    }
    render(){
        
        return(<h1 className="title">Lista de {this.state.titulo}</h1>)
    }

}

export default Title;