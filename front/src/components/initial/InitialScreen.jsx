import React from 'react';

const InitialScreen = ( ) =>{
    return (
        <div className="video">
            <video muted loop autoPlay style={{position:'absolute',
                                                height:'85%',
                                                width:'100%'}}
            id="myVideo" controls poster="true">
                <source type="video/mp4" src=""/>
            </video>
        </div>
    )
}

export default InitialScreen;

