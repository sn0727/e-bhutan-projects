import React from 'react'
import { image } from '../../../constent/image'
import { Link } from 'react-router-dom'

const AnimateGIF = ({ setIdComponent }) => {
    return (
        <div
            style={{
                maxWidth: '250px',
                margin: 'auto'
            }}
        >
            <img src={image?.paymentSuccess} alt="AnimateGIF"
                style={{
                    maxWidth: '150px',
                    margin: 'auto'
                }}
            />
            <p className='payment-successfull'
                style={{
                    textAlign: 'center'
                }}
            >Payment Successful</p>

            <div className='share-and-print'
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '110px',
                    margin: '20px auto 0'
                }}
            >
                <Link>
                    <img width={30} height={40} src={image?.shareIcon} alt="" />
                </Link>
                <Link>
                    <img width={30} height={40} src={image?.printIcon} alt="" />
                </Link>
                <Link>
                    <img width={30} height={40} src={image?.downloadIcon} alt="" />
                </Link>
            </div>

            <div className='button-process procced-chnage-space'>
                <button type='button' className='button-pro'>
                    <Link onClick={() => setIdComponent(1)}>Share Bill</Link>
                </button>
            </div>
        </div>
    )
}

export default AnimateGIF