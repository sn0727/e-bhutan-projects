import React from 'react'
import { image } from '../../../constent/image'
import { SvgIcon } from '../../../constent/SvgIcons'
import { Link } from 'react-router-dom'

const AddTravelDetails = ({setIdComponent}) => {
    return (
        <div className='add-travel-detail'>
            <h3 className='add-travel-detail-title'>Add travel details</h3>
            <div className='main-bx-add-travel'>
                <div className='Discounted-price-bx'>
                    <p>Discounted price at {SvgIcon?.indiaRupeGreen} 4,278 </p>
                </div>
                <div className='add-travel-details-bx'>
                    <div className='add-travel-bx'>
                        <div className='servcie-image-bx'>
                            <img src={image?.airIndiaImage} alt="service-image" />
                        </div>
                        <p>QP-1119</p>
                    </div>
                    <div className='add-travel-bx'>
                        <h5>Delhi</h5>
                        <h5>09:00</h5>
                        <p>Fri, 21 Jul</p>
                        <p>(T2) IGI</p>
                    </div>
                    <div className='add-travel-bx'>
                        <div className='contentLine'> 1h 55m </div>
                    </div>
                    <div className='add-travel-bx'>
                        <h5>Mumbai</h5>
                        <h5>10:55</h5>
                        <p>Fri, 21 Jul</p>
                        <p>(T1) CSM</p>
                    </div>
                </div>
                <div className='add-travel-list-bx'>
                    <ul>
                        <li>Cancellation Fee</li>
                        <li>Check-in Bag</li>
                        <li>Hand Bag</li>
                        <li>Meal</li>
                        <li>Seat</li>
                    </ul>
                    <ul>
                        <li>Starting INR 2000</li>
                        <li>15KG</li>
                        <li>7KG</li>
                        <li>Chargable</li>
                        <li>Chargable</li>
                    </ul>
                </div>
                <div className='button-process procced-chnage-space'>
                    <button type='button' className='button-pro'>
                        <Link onClick={() => setIdComponent(4)}>Proceed</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddTravelDetails