import React, { useState } from 'react'
import { image } from '../../../constent/image'
import { SvgIcon } from "../../../constent/SvgIcons"
import { useRecoilState, useRecoilValue } from 'recoil'
import { apiData, apiSingalData } from '../atom/atom'
import moment from 'moment'

// const buttonS = ["Cheapest", "Non-Stop", "Timings", "Duration"]
const buttonS = [
    {
        buttonName: 'Cheapest',
        Cheapest: 'Cheapest',
    },
    {
        buttonName: 'Non-Stop',
        nonStop: 'Non-Stop',
    },
    {
        id : 3,
        buttonName: 'Timings',
        DepTime: 'DepTime',
        ArrTime: 'ArrTime'
    },
    {
        id: 4,
        buttonName: 'Duration',
        Duration: 'Duration'
    }
]

function FlightTicketList({ setIdComponent }) {
    const saveResponseData = useRecoilValue(apiData)
    const [apiSingalData22, setApiSingalData] = useRecoilState(apiSingalData)
    const [activeColor, setActiveColor] = useState([])
    const [bookingObj, setbookingObj] = useState('')
    const { Results } = saveResponseData?.Response;
    const [shorData, setShorData] = useState(Results[0])

    console.log(Results, '============= apiData')

    // Calculate hours and minutes
    function convertToTime(number) {
        var hours = Math.floor(number / 60);
        var minutes = number % 60;
        // Format the result
        var timeString = hours + "h " + minutes + "m";

        return timeString;
    }

    // const resultsArray = Results.slice();
    // let shorData = resultsArray.sort((a, b) => new Date(a.DepTime) - new Date(b.DepTime));
    
    // short filter Funcation  code.
    function shortFuncation(data) {
        const resultsArray = Results[0]?.slice();
        setActiveColor(data?.buttonName)
        if (data?.id === 3) {
            let shorData = resultsArray?.sort((a, b) => new Date(a?.Segments[0][0]?.Origin?.DepTime) - new Date(b?.Segments[0][0]?.Origin?.DepTime));
            setShorData(shorData);
        }
        if (data?.id === 4) {
            let shorData = resultsArray.sort((a, b) => new Date(a?.Segments[0][0]?.Duration) - new Date(b?.Segments[0][0]?.Duration));
            setShorData(shorData);
        }
    }

    // getSingalData code.
    const getSingalData = (data) => {
        setbookingObj(data)
        setApiSingalData(data)
        setIdComponent(3)
    }

    // filterTime
    function filterTime(time) {
        // Parse the date and time using Moment.js
        const startdateTime = moment(time);

        // Format to display only the time in 12-hour format
        const startformattedTime = startdateTime.format('h:mm A');

        return startformattedTime; // Output: 4:13 PM
    }

    return (
        <div className='booking-list-main'>
            <div className='booking-list-tb-button'>
                <div className='booking-list-tb-button-inr'>
                    {
                        buttonS.map((button, index) => (
                            <button type='button' className={`${activeColor === button?.buttonName ? 'activeColor' : null}`} key={index} onClick={() => shortFuncation(button)}> {button?.buttonName} </button>
                        ))
                    }
                </div>
            </div>
            <div className='booking-list-tb-content'>
                <h3 className='tb-title'>Fares with Exclusive discounts</h3>
                {/* row 01 */}
                {
                    shorData?.map((bookingItem, index) => (
                        // <div className={`booking-01`} key={index} onClick={() => alert('bookingItem')}>
                        <div className={`booking-01 ${bookingObj?.ResultIndex === bookingItem?.ResultIndex ? 'activeClassAdd' : ''}`} key={index}>
                            <div className='booking-01-inr'>
                                <div className='service-logo'>
                                    <h3 className='flightName'>{bookingItem?.Segments[0][0]?.Airline?.AirlineName}</h3>
                                </div>
                                <p className='avilable-seat'>2 Seats Left</p>
                            </div>
                            <div className='booking-01-inr'>
                                <p className='time-inr'>{filterTime(bookingItem?.Segments[0][0]?.Origin.DepTime)} - {filterTime(bookingItem?.Segments[0][0]?.Destination?.ArrTime)}</p>
                                <p className='time-inr'>{bookingItem?.Segments[0][0]?.Origin?.Airport?.AirportCode} - {bookingItem?.Segments[0][0]?.Destination?.Airport?.AirportCode}</p>
                                <p className='time-inr-dt'>{convertToTime(bookingItem?.Segments[0][0]?.Duration)} I Non-Stop</p>
                            </div>
                            <div className='booking-01-inr'>
                                <div className='button-and-price'>
                                    <p className='price-inr'>{SvgIcon?.indiaRupe} {bookingItem?.Fare?.PublishedFare?.toFixed(2)}</p>
                                    <button type="button" class="null" onClick={() => getSingalData(bookingItem)}> Book Now </button>
                                </div>
                                <div className='Discounted-price-at'>
                                    <p>Discounted price at {SvgIcon?.indiaRupeGreen} {bookingItem?.Fare?.OfferedFare.toFixed(2)}</p>
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