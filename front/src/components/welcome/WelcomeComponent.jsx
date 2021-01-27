import React , {Component} from 'react';

class WelcomeComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            welcomeMessage: ''
        }
    }

    render(){
        return(
            <div>hola</div>
        )
    }
}

export default WelcomeComponent;