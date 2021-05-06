import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

export const Jumbo = (props) => {
    return (
        <Jumbotron style={{display:'flex', alignText:'center', flexDirection: 'column'}}>
            <h2>Welcome to Mommies</h2>


            <p>
            {props.children}
            </p>
        </Jumbotron>
    )
}