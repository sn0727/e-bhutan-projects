import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

const PreviousButton = ({setIdComponent, idComponent}) => {
    return (
        <div className='go-to-back mt-4' onClick={()=> setIdComponent(idComponent === 1 ? 1 : idComponent - 1)}>
            <Link><IoMdArrowRoundBack /></Link>
        </div>
    )
}

export default PreviousButton