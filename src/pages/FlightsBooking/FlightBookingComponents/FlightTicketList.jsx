import React, { useState } from 'react'
import { image } from '../../../constent/image'
import { SvgIcon } from "../../../constent/SvgIcons"

const buttonS = ["Cheapest", "Non-Stop", "Timings", "Duration"]

function FlightTicketList({ setIdComponent, saveResponseData }) {
    const [activeColor, setActiveColor] = useState('Timings')
    const [bookingObj, setbookingObj] = useState('')
    const { Results } = saveResponseData?.Response
    // console.log(Results, 'saveResponseData 11 ===========================')

    // Calculate hours and minutes
    function convertToTime(number) {
        var hours = Math.floor(number / 60);
        var minutes = number % 60;
        // Format the result
        var timeString = hours + "h " + minutes + "m";

        return timeString;
    }

    const getSingalData = (data) => {
        setbookingObj(data)
    }

    // console.log(bookingObj?.ResultIndex, '=================== bookingObj')

    return (
        <div className='booking-list-main'>
            <div className='booking-list-tb-button'>
                <div className='booking-list-tb-button-inr'>
                    {
                        buttonS.map((button, index) => (
                            <button type='button' className={`${activeColor === button ? 'activeColor' : null}`} key={index} onClick={() => setActiveColor(button)}> {button} </button>
                        ))
                    }
                </div>
            </div>
            <div className='booking-list-tb-content'>
                <h3 className='tb-title'>Fares with Exclusive discounts</h3>
                {/* row 01 */}
                {
                    Results[0]?.map((bookingItem, index) => (
                        <div className={`booking-01 ${bookingObj?.ResultIndex === bookingItem?.ResultIndex ? 'activeClassAdd' : '' }`} key={index} onClick={()=> getSingalData(bookingItem)}>
                            <div className='booking-01-inr'>
                                <div className='service-logo'>
                                    {/* <img src={image?.airIndiaImage} alt="logo name" /> */}
                                    <h3 className='flightName'>{bookingItem?.Segments[0][0]?.Airline?.AirlineName}</h3>
                                </div>
                                <p className='avilable-seat'>2 Seats Left</p>
                            </div>
                            <div className='booking-01-inr'>
                                <p className='time-inr'>09:00-10:55</p>
                                <p className='time-inr-dt'>{convertToTime(bookingItem?.Segments[0][0]?.Duration)} I Non-Stop</p>
                                {/* <p className='time-inr-dt'>{bookingItem?.Segments[0]?.map((innerItem, index) => innerItem?.Duration) } I Non-Stop</p> */}
                                {/* <p className='time-inr-dt'>{bookingItem?.Segments[0]?.map((innerItem, index) => convertToTime(innerItem?.Duration)) } I Non-Stop</p> */}
                            </div>
                            <div className='booking-01-inr'>
                                <p className='price-inr'>{SvgIcon?.indiaRupe} {bookingItem?.Fare?.PublishedFare}</p>
                                <div className='Discounted-price-at'>
                                    <p>Discounted price at {SvgIcon?.indiaRupeGreen} {bookingItem?.Fare?.OfferedFare}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }


            </div>
        </div>
    )
}

export default FlightTicketList