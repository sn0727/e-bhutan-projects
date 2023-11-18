import React from 'react';
import internetErrorImage from "./../../../src/assets/error/internetError.png"
import { Button } from '@chakra-ui/react';

const NetwordError = () => {
    
    return (
        <div className='network-error'>
            <img src={internetErrorImage} alt=" NETWORK ERROR" />
            <Button onClick={()=>window.location.href = "http://localhost:3000"}>Reload Here!</Button>
        </div>
    )
}

export default NetwordError