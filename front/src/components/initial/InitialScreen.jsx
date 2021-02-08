import React, { Component } from 'react';

class FooterComponent extends Component {
    render() {
        return (
            <div className="video">
                <video muted loop autoPlay style={{position:'absolute',
                                                    height:'85%',
                                                    width:'100%'}}
                id="myVideo" controls poster="true">
                    <source type="video/mp4" src="https://vasscompany.com/wp-content/uploads/2021/01/Videos-home-VASS.mp4"/>
                </video>
            </div>
        )
    }
}

export default FooterComponent;

