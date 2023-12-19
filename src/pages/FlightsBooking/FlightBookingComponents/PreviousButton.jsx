import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'

const PreviousButton = ({ setIdComponent, idComponent }) => {
    let navigate = useNavigate()
    idComponent === 0 && navigate("/")


    const Back = () => {
        if (idComponent === 8) {
            setIdComponent(1)
        } else {
            setIdComponent(idComponent === 0 ? 1 : idComponent - 1)
        }
    }

    return (
        <div className='go-to-back mt-4' onClick={() => Back()}>
            <Link><IoMdArrowRoundBack /></Link>
        </div>
    )
}

export default PreviousButton