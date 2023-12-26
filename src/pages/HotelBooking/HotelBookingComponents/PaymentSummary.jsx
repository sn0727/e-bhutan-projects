import React, { useEffect, useState } from 'react'
import { SvgIcon } from '../../../constent/SvgIcons'
import { Link } from 'react-router-dom'
import { adultsQuantity1, childrenQuantity1, finalDataTickState, roomQuantity, saveHotelBookResponseData } from '../atom/atom';
import { useRecoilValue } from 'recoil';

const HotelPaymentSummary = ({ setIdComponent }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const adultsQuantity = useRecoilValue(adultsQuantity1)
    const childrenQuantity = useRecoilValue(childrenQuantity1)
    const roomNoOfQuantity = useRecoilValue(roomQuantity)
    const hotelBookDataResponse = useRecoilValue(saveHotelBookResponseData)
    const finalDataTickBook = useRecoilValue(finalDataTickState)

    // console.log(finalDataTickBook, 'finalDataTickBook =================')

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentDate(new Date());
        }, 1000);
    
        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <div className='Booking-Details-main'>
            <h3 className='add-travel-detail-title'>Booking Details</h3>
            <div className='booking-details-inr-dl'>
                <div className='booking-detail-list-dl'>
                    {/* row 01 */}
                    {/* <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.durationIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Night Of Stay</h3>
                            <p>2 Day’s, 3 Nights</p>
                        </div>
                    </div> */}
                    {/* row 02 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.PassengerIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Number of guest</h3>
                            <p>{adultsQuantity} Adult’s, {childrenQuantity} Children</p>
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
                            <p>{currentDate.toString()}</p>
                        </div>
                    </div>
                </div>
                <div className='booking-detail-list-dl-rt'>
                    {/* <h3>Payment Summary</h3>
                    <div className='input-add-promo'>
                        <input type="text" name="promo" id="promo" />
                        <button className='promo-button'>Add Promo</button>
                    </div> */}
                    <h3 className='mt-20 mb-0'>Total Price</h3>
                    <div className='list-of-summary'>
                        <div className='list-of-summary-inr'>
                            <div>
                                <h3>J.W Marriott, N. Delhi</h3>
                                {/* <p>2 x @2400</p> */}
                                <p>------</p>
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
                    <Link onClick={() => setIdComponent(6)}>Proceed</Link>
                </button>
            </div>
        </div>
    )
}

export default HotelPaymentSummary