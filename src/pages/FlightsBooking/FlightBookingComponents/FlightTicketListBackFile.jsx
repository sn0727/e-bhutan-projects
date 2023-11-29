import React, { useState } from 'react'
import { image } from '../../../constent/image'
import { SvgIcon } from "../../../constent/SvgIcons"

const buttonS = ["Cheapest", "Non-Stop", "Timings", "Duration"]

function FlightTicketList({setIdComponent, saveResponseData}) {
    const [activeColor, setActiveColor] = useState('Timings')
    const { Results } = saveResponseData?.Response
    // console.log(Results, 'saveResponseData 11 ===========================')

    return (
        <div className='booking-list-main'>
            <div className='booking-list-tb-button'>
                <div className='booking-list-tb-button-inr'>
                    {
                        buttonS.map((button, index) => (
                            <button type='button' className={`${activeColor === button ? 'activeColor' : null}`} key={index} onClick={()=>setActiveColor(button)}> {button} </button>
                        ))
                    }
                </div>
            </div>
            <div className='booking-list-tb-content'>
                <h3 className='tb-title'>Fares with Exclusive discounts</h3>
                {/* row 01 */}
                <div className='booking-01' onClick={()=>setIdComponent(3)}>
                    <div className='booking-01-inr'>
                        <div className='service-logo'>
                            <img src={image?.airIndiaImage} alt="logo name" />
                        </div>
                        <p className='avilable-seat'>2 Seats Left</p>
                    </div>
                    <div className='booking-01-inr'>
                        <p className='time-inr'>09:00-10:55</p>
                        <p className='time-inr-dt'>1h 55m I Non-Stop</p>
                    </div>
                    <div className='booking-01-inr'>
                        <p className='price-inr'>{SvgIcon?.indiaRupe} 4,278</p>
                        <div className='Discounted-price-at'>
                            <p>Discounted price at {SvgIcon?.indiaRupeGreen} 4,278</p>
                        </div>
                    </div>
                </div>

                {/* row 02 */}
                <div className='booking-01'>
                    <div className='booking-01-inr'>
                        <div className='service-logo'>
                            <img src={image?.vistara} alt="logo name" />
                        </div>
                        <p className='avilable-seat'>2 Seats Left</p>
                    </div>
                    <div className='booking-01-inr'>
                        <p className='time-inr'>09:00-10:55</p>
                        <p className='time-inr-dt'>1h 55m I Non-Stop</p>
                    </div>
                    <div className='booking-01-inr'>
                        <p className='price-inr'>{SvgIcon?.indiaRupe} 4,278</p>
                        <div className='Discounted-price-at'>
                            <p>Discounted price at {SvgIcon?.indiaRupeGreen} 4,278</p>
                        </div>
                    </div>
                </div>

                {/* row 03 */}
                <div className='booking-01'>
                    <div className='booking-01-inr'>
                        <div className='service-logo'>
                            <img src={image?.airIndiaImage} alt="logo name" />
                        </div>
                        <p className='avilable-seat'>2 Seats Left</p>
                    </div>
                    <div className='booking-01-inr'>
                        <p className='time-inr'>09:00-10:55</p>
                        <p className='time-inr-dt'>1h 55m I Non-Stop</p>
                    </div>
                    <div className='booking-01-inr'>
                        <p className='price-inr'>{SvgIcon?.indiaRupe} 4,278</p>
                        <div className='Discounted-price-at'>
                            <p>Discounted price at {SvgIcon?.indiaRupeGreen} 4,278</p>
                        </div>
                    </div>
                </div>

                {/* row 04 */}
                <div className='booking-01'>
                    <div className='booking-01-inr'>
                        <div className='service-logo'>
                            <img src={image?.vistara} alt="logo name" />
                        </div>
                        <p className='avilable-seat'>2 Seats Left</p>
                    </div>
                    <div className='booking-01-inr'>
                        <p className='time-inr'>09:00-10:55</p>
                        <p className='time-inr-dt'>1h 55m I Non-Stop</p>
                    </div>
                    <div className='booking-01-inr'>
                        <p className='price-inr'>{SvgIcon?.indiaRupe} 4,278</p>
                        <div className='Discounted-price-at'>
                            <p>Discounted price at {SvgIcon?.indiaRupeGreen} 4,278</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FlightTicketList