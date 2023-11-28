import React from 'react'
import { SvgIcon } from '../../../constent/SvgIcons'
import { Link } from 'react-router-dom'

const BookingDetails = ({ setIdComponent }) => {
    return (
        <div className='Booking-Details-main'>
            <h3 className='add-travel-detail-title'>Add travel details</h3>
            <div className='booking-details-inr-dl'>
                <div className='booking-detail-list-dl'>
                    {/* row 01 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.durationIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Duration</h3>
                            <p>2 Day’s, 3 Nights</p>
                        </div>
                    </div>
                    {/* row 02 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.PassengerIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Passenger</h3>
                            <p>2 Adult’s</p>
                        </div>
                    </div>
                    {/* row 03 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.TransportIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Transport</h3>
                            <p>Air India, Economy Class</p>
                        </div>
                    </div>

                    {/* row 04 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.HotelIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Hotel</h3>
                            <p>J.W Marriott, N. Delhi</p>
                        </div>
                    </div>
                    {/* row 05 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.DateofTravelIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Date of Travel</h3>
                            <p>14 Jul - 17 Jul, 2023</p>
                        </div>
                    </div>
                </div>
                <div className='booking-detail-list-dl-rt'>
                    <h3>Payment Summary</h3>
                    <div className='input-add-promo'>
                        <input type="text" name="promo" id="promo" />
                        <button className='promo-button'>Add Promo</button>
                    </div>
                    <h3 className='mt-20 mb-0'>Payment Summary</h3>
                    <div className='list-of-summary'>
                        <div className='list-of-summary-inr'>
                            <div>
                                <h3>Hat’s Package</h3>
                                <p>2 x @2400</p>
                            </div>
                            <div>
                                <p>{SvgIcon?.indiaRupe} 4800</p>
                            </div>
                        </div>

                        <div className='list-of-summary-inr02'>
                            <div>
                                <h3>Subtotal</h3>
                                <h3>Service charge</h3>
                                <h3>Discount</h3>
                            </div>
                            <div>
                                <p>{SvgIcon?.indiaRupe} 4800</p>
                                <p>{SvgIcon?.indiaRupe} 30</p>
                                <p>{SvgIcon?.indiaRupe} 0</p>
                            </div>
                        </div>

                        <div className='list-of-summary-inr02 border-0'>
                            <div>
                                <h3>Total</h3>
                            </div>
                            <div>
                                <p>{SvgIcon?.indiaRupe} 4830</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='button-process procced-chnage-space'>
                <button type='button' className='button-pro'>
                    <Link onClick={() => setIdComponent(5)}>Proceed</Link>
                </button>
            </div>
        </div>
    )
}

export default BookingDetails