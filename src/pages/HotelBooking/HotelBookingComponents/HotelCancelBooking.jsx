import React from 'react'
import { ButtonBook } from '../../../components/Common/Button/button'
import AnimateGIF from '../../../components/Common/AminateGIF/AnimateGIF'
import { Link } from 'react-router-dom'
import { image } from '../../../constent/image'
import { FaCheck } from "react-icons/fa6";

const HotelCancelBooking = ({ setIdComponent }) => {
    return (
        <div className='booking-cancel-dfdoe'
            style={{
                maxWidth: '450px',
                margin: 'auto'
            }}
        >
            <img src={image?.paymentSuccess} alt="AnimateGIF"
                style={{
                    maxWidth: '110px',
                    marginRight: 'auto'
                }}
            />
            <div className='sdbfsdj-dsfdskjb'>
                <h3 className='payment-successfull mb-3 mt-3'>Your booking was <span style={{ color: 'green' }}>cancelled for free</span></h3>
                <p><FaCheck /> We'll send you an email confirming your cancellation to <b>demo@gmail.com</b></p>
                <p><FaCheck />  Your booking was successfull cancelled - you don't have to  do anything else!</p>
            </div>
            <div className='button-process procced-chnage-space' style={{ textAlign: 'right' }}>
                <button type='button' className='button-pro'>
                    <Link onClick={() => setIdComponent(1)}>Book again</Link>
                </button>
            </div>
        </div>
    )
}

export default HotelCancelBooking