import React, { useState } from 'react'
import { image } from '../../constent/image'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiDownload } from 'react-icons/fi';

const PanCardVerification = () => {
    // callBackUrl = "https://app.ebhuktan.com/pan-card-status"
    // callBackUrl = "https://web-ebhuktan.netlify.app/pan-card-status"

    return (
        <div
            style={{
                maxWidth: '250px',
                margin: 'auto',
                paddingTop: '100px'
            }}
        >
            <img src={image?.paymentSuccess} alt="AnimateGIF" style={{
                maxWidth: '150px',
                margin: 'auto'
            }}
            />
            <p className='payment-successfull' style={{ textAlign: 'center' }}>
                Thank You, <br /> Your PAN card registration has been successful. Please check your email ID</p>

            <div className='share-and-print'
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '110px',
                    margin: '20px auto 0'
                }}
            >
            </div>

            <div className='button-process procced-chnage-space'>
                <button type='button' className='button-pro'>
                    {/* <Link onClick={() => navigator('/')}>Share Bill</Link> */}
                    <Link to={'/'}>Back to Home</Link>
                </button>
            </div>
        </div>
    )
}

export default PanCardVerification