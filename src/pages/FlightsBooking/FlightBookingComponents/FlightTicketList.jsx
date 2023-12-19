import React, { useEffect, useState } from 'react'
import { image } from '../../../constent/image'
import { SvgIcon } from "../../../constent/SvgIcons"
import { useRecoilState, useRecoilValue } from 'recoil'
import { apiData, apiSingalData } from '../atom/atom'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, setFilterReturn, setResultIndex } from '../../../app/slice/FlightSlice'
import { Link } from 'react-router-dom'

// const buttonS = ["Cheapest", "Non-Stop", "Timings", "Duration"]
const buttonS = ['Cheapest', 'Non-Stop', 'Timings', 'Duration']


function FlightTicketList({ setIdComponent }) {
    const dispatch = useDispatch();
    const filteredFlights = useSelector(state => state.flights.filteredFlights);
    const filteredFlightsReturn = useSelector(state => state.flights.filteredFlightsReturn);
    const saveResponseData = useRecoilValue(apiData)
    const [apiSingalData22, setApiSingalData] = useRecoilState(apiSingalData)
    const [saveBill, setsaveBill] = useState('')
    const [bookingObj, setbookingObj] = useState('')
    const { Results } = saveResponseData?.Response;
    const [shorData, setShorData] = useState(Results[0]);
    const [MultiFlightSelect, setMultiFlightSelect] = useState({ departure: null, return: null });

    console.log(Results, '============= apiData')


    const handleFilter = filterOption => {
        dispatch(setFilter({ filterOption }));
        dispatch(setFilterReturn({ filterOption }));
    };

    useEffect(() => {
        handleFilter(saveBill)
    }, [saveBill])


    const getSingalData = (data) => {
        console.log(data?.AirlineCode);
        dispatch(setResultIndex({ departure: data, return: null }))
        setIdComponent(3)
    }

    const Submit = () => {
        if (MultiFlightSelect?.departure?.ResultIndex && MultiFlightSelect?.return?.ResultIndex) {
            dispatch(setResultIndex({
                departure: MultiFlightSelect?.departure?.ResultIndex,
                return: MultiFlightSelect?.return?.ResultIndex
            }))
            setIdComponent(3)
        }
    }

    // Calculate hours and minutes
    function convertToTime(number) {
        var hours = Math.floor(number / 60);
        var minutes = number % 60;
        var timeString = hours + "h " + minutes + "m";
        return timeString;
    }
    // filterTime
    function filterTime(time) {
        // Parse the date and time using Moment.js
        const startdateTime = moment(time);
        // Format to display only the time in 12-hour format
        const startformattedTime = startdateTime.format('h:mm A');
        return startformattedTime; // Output: 4:13 PM
    }
    console.log(MultiFlightSelect, 'MultiFlightSelect');
    return (
        <div className='booking-list-main'>
            <div className='booking-list-tb-button'>
                <div className='booking-list-tb-button-inr'>
                    {
                        buttonS.map((button, index) => (
                            <button type='button' className={`${saveBill === button ? 'activeColor' : null}`} key={index} onClick={() => setsaveBill(button)}> {button} </button>
                        ))
                    }
                </div>
            </div>
            <div className='booking-list-tb-content'>
                <h3 className='tb-title'>Fares with Exclusive discounts</h3>
                {/* row 01 */}
                <div className='flightlistbothbox'>
                    <div className={filteredFlightsReturn?.length > 1 ? 'flightlistbox' : 'flightlistboxone'}>
                        {
                            filteredFlights?.map((bookingItem, index) => (
                                // <div className={`booking-01`} key={index} onClick={() => alert('bookingItem')}>
                                <div className={`booking-01 ${MultiFlightSelect?.departure?.ResultIndex == bookingItem?.ResultIndex ? 'activeClassAdd' : ''}`} key={index}
                                    onClick={() =>
                                        filteredFlightsReturn?.length > 1 ?
                                            setMultiFlightSelect({ ...MultiFlightSelect, departure: bookingItem }) :
                                            console.log('')
                                    }
                                >
                                    <div className='booking-01-inr'>
                                        <div className='service-logo'>
                                            <h3 className='flightName'>{bookingItem?.Segments[0][0]?.Airline?.AirlineName} {bookingItem?.ResultIndex}</h3>
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
                                            {filteredFlightsReturn?.length > 1 ? null : < button type="button" class="null"
                                                onClick={() =>
                                                    getSingalData(bookingItem?.ResultIndex)
                                                }> Book Now </button>}
                                        </div>
                                        <div className='Discounted-price-at'>
                                            <p>Discounted price at {SvgIcon?.indiaRupeGreen} {bookingItem?.Fare?.OfferedFare.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {filteredFlightsReturn?.length > 1 ?
                        <div className='flightlistbox'>
                            {
                                filteredFlightsReturn?.map((bookingItem, index) => (
                                    <div className={`booking-01 ${MultiFlightSelect?.return?.ResultIndex === bookingItem?.ResultIndex ? 'activeClassAdd' : ''}`} key={index}
                                        onClick={() =>
                                            setMultiFlightSelect({ ...MultiFlightSelect, return: bookingItem })
                                        }
                                    >
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
                                                {/* <button type="button" class="null" onClick={() =>
                                                    setMultiFlightSelect({ ...MultiFlightSelect, return: bookingItem?.AirlineCode })
                                                }> Book Now </button> */}
                                            </div>
                                            <div className='Discounted-price-at'>
                                                <p>Discounted price at {SvgIcon?.indiaRupeGreen} {bookingItem?.Fare?.OfferedFare.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        : null
                    }
                </div>



                {MultiFlightSelect?.departure?.ResultIndex && MultiFlightSelect?.return?.ResultIndex ?
                    <div className='multiple-select-button'>
                        <div className='d-flex' style={{ justifyContent: 'space-evenly' }}>
                            <div className='booking-01-inr'>
                                <div className='service-logo'>
                                    <h3 className='flightName'>{MultiFlightSelect?.departure?.Segments[0][0]?.Airline?.AirlineName}</h3>
                                </div>
                                {/* <p className='price-inr'>{SvgIcon?.indiaRupe} {MultiFlightSelect?.departure?.Fare?.PublishedFare?.toFixed(2)}</p> */}
                                <div className='booking-01-inr'>
                                    <p className='time-inr'>{filterTime(MultiFlightSelect?.departure?.Segments[0][0]?.Origin.DepTime)} - {filterTime(MultiFlightSelect?.departure?.Segments[0][0]?.Destination?.ArrTime)}</p>
                                    <p className='time-inr'>{MultiFlightSelect?.departure?.Segments[0][0]?.Origin?.Airport?.AirportCode} - {MultiFlightSelect?.departure?.Segments[0][0]?.Destination?.Airport?.AirportCode}</p>
                                </div>
                            </div>
                            <div style={{ height: 60, width: 2, backgroundColor: '#000' }}></div>
                            <div className='booking-01-inr'>
                                <div className='service-logo'>
                                    <h3 className='flightName'>{MultiFlightSelect?.return?.Segments[0][0]?.Airline?.AirlineName}</h3>
                                </div>
                                {/* <p className='price-inr'>{SvgIcon?.indiaRupe} {MultiFlightSelect?.return?.Fare?.PublishedFare?.toFixed(2)}</p> */}
                                <div className='booking-01-inr'>
                                    <p className='time-inr'>{filterTime(MultiFlightSelect?.return?.Segments[0][0]?.Origin.DepTime)} - {filterTime(MultiFlightSelect?.return?.Segments[0][0]?.Destination?.ArrTime)}</p>
                                    <p className='time-inr'>{MultiFlightSelect?.return?.Segments[0][0]?.Origin?.Airport?.AirportCode} - {MultiFlightSelect?.return?.Segments[0][0]?.Destination?.Airport?.AirportCode}</p>
                                </div>
                            </div>
                            <div style={{ height: 60, width: 2, backgroundColor: '#000' }}></div>
                            <div>
                                <p style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, justifyContent: 'center' }}>
                                    {SvgIcon?.indiaRupe} {(MultiFlightSelect?.departure?.Fare?.PublishedFare + MultiFlightSelect?.return?.Fare?.PublishedFare)?.toFixed(2)}
                                </p>
                                <div className='button-process procced-chnage-space' style={{ margin: '0', }}>
                                    <button type='button' className='button-pro'>
                                        <Link onClick={() => Submit()}>Proceed</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}

            </div>
        </div >
    )
}

export default FlightTicketList