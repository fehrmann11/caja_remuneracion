import React from 'react'

class EnterprisesForm extends React.Component{
    render(){
        return (
            <div>Formulario {this.props.match.params.id}</div>
        )
    }

}

export default EnterprisesForm;