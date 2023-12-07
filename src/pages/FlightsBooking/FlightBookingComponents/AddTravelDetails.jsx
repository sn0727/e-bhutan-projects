import React, { useEffect, useState } from 'react'
import { image } from '../../../constent/image'
import { SvgIcon } from '../../../constent/SvgIcons'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { apiData, apiSingalData, ipAddressSave } from '../atom/atom'
import { APIRequest, ApiUrl } from '../../../utils/api'
import { toast } from 'react-toastify'
import Loader from '../../../components/Feature/Loader'
import moment from 'moment'

const AddTravelDetails = ({ setIdComponent }) => {
    const [AddTravelDetailRes, setAddTravelDetailRes] = useState([])
    const setApiSingalData = useRecoilValue(apiSingalData);
    const saveResponseData = useRecoilValue(apiData)
    const ipAddress = useRecoilValue(ipAddressSave)
    const [isLoading, setIsLoading] = useState(true)
    const [resError, setResError] = useState({})

    // // setIdComponent(4)
    const travelDetailsHandlerFun = () => {
        setIdComponent(4)
    }

    useEffect(() => {
        setIsLoading(true)
        let config = {
            method: 'post',
            url: ApiUrl?.fareQuoteSearch,
            body: {
                "EndUserIp": ipAddress,
                "TraceId": saveResponseData?.TraceId,
                "ResultIndex": setApiSingalData?.ResultIndex
            }
        }
        APIRequest(
            config,
            res => {
                console.log(res, '====================== res booking')
                setAddTravelDetailRes(res?.data?.Response?.Results)
                setIsLoading(false)
                // setIdComponent(4)
            },
            err => {
                console.log(err, '====================== err hhh booking')
                setResError(err)
                setIsLoading(false)
            }
        )
    }, [setAddTravelDetailRes])

    // filterTime
    function filterTime(time) {
        // Parse the date and time using Moment.js
        const startdateTime = moment(time);

        // Format to display only the time in 12-hour format
        const startformattedTime = startdateTime.format('h:mm A');

        return startformattedTime; // Output: 4:13 PM
    }

    // Calculate hours and minutes
    function convertToTime(number) {
        var hours = Math.floor(number / 60);
        var minutes = number % 60;
        // Format the result
        var timeString = hours + "h " + minutes + "m";

        return timeString;
    }

    function getDateFunc(date) {
        const formattedDate = moment(date).format('ddd, DD MMM');
        return formattedDate
    }

    
    // console.log(AddTravelDetailRes, 'AddTravelDetailRes =============')

    return (
        <div className='add-travel-detail'>
            {
                isLoading ? <Loader isLoading={isLoading} />
                    :  resError?.error === true ? resError?.message :
                    <>
                        <h3 className='add-travel-detail-title'>Add travel details</h3>
                        <div className='main-bx-add-travel'>
                            <div className='Discounted-price-bx'>
                                <p>Discounted price at {SvgIcon?.indiaRupeGreen} {AddTravelDetailRes?.Fare?.OurPublishedFare} </p>
                            </div>
                            <div className='add-travel-details-bx'>
                                <div className='add-travel-bx'>
                                    <div className='servcie-image-bx'>
                                        <h3 className='flightName'>{AddTravelDetailRes?.Segments[0][0]?.Airline?.AirlineName}</h3>
                                    </div>
                                    <p>
                                        {AddTravelDetailRes?.Segments[0][0]?.Airline?.AirlineCode}
                                        -
                                        {AddTravelDetailRes?.Segments[0][0]?.Airline?.FlightNumber}
                                    </p>
                                </div>
                                <div className='add-travel-bx'>
                                    <h5>
                                        {AddTravelDetailRes?.Segments[0][0]?.Origin?.Airport?.CityName}
                                        -
                                        {AddTravelDetailRes?.Segments[0][0]?.Origin?.Airport?.AirportCode}
                                    </h5>
                                    <h5>{filterTime(AddTravelDetailRes?.Segments[0][0]?.Origin?.DepTime)}</h5>
                                    <p>{getDateFunc(AddTravelDetailRes?.Segments[0][0]?.Origin?.DepTime)}</p>
                                    <p>
                                        (T-{AddTravelDetailRes?.Segments[0][0]?.Origin?.Airport?.Terminal})
                                        -
                                        {AddTravelDetailRes?.Segments[0][0]?.Origin?.Airport?.AirportName}
                                    </p>
                                </div>
                                <div className='add-travel-bx'>
                                    <div className='contentLine'> {convertToTime(AddTravelDetailRes?.Segments[0][0]?.Duration)}</div>
                                </div>
                                <div className='add-travel-bx'>
                                    <h5>
                                        {AddTravelDetailRes?.Segments[0][0]?.Destination?.Airport?.CityName}
                                        -
                                        {AddTravelDetailRes?.Segments[0][0]?.Destination?.Airport?.AirportCode}
                                    </h5>
                                    <h5>{filterTime(AddTravelDetailRes?.Segments[0][0]?.Destination?.ArrTime)}</h5>
                                    <p>{getDateFunc(AddTravelDetailRes?.Segments[0][0]?.Destination?.ArrTime)}</p>
                                    <p>(T-{AddTravelDetailRes?.Segments[0][0]?.Destination?.Airport?.Terminal})
                                        -
                                        {AddTravelDetailRes?.Segments[0][0]?.Destination?.Airport?.AirportName}
                                    </p>
                                </div>
                            </div>
                            <div className='add-travel-list-bx'>
                                <ul>
                                    <li>Cancellation Fee</li>
                                    <li>Check-in Bag</li>
                                    <li>Hand Bag</li>
                                    <li>Meal</li>
                                </ul>
                                <ul>
                                    <li>{AddTravelDetailRes?.MiniFareRules[0][1]?.Details ? AddTravelDetailRes?.MiniFareRules[0][1]?.Details : 'no data'}</li>
                                    <li>{AddTravelDetailRes?.Segments[0][0]?.Baggage ? AddTravelDetailRes?.Segments[0][0]?.Baggage : 'no data'}</li>
                                    <li>{AddTravelDetailRes?.Segments[0][0]?.CabinBaggage ? AddTravelDetailRes?.Segments[0][0]?.CabinBaggage : 'no data'}</li>
                                    <li>{AddTravelDetailRes?.Segments[0][0]?.Mile ? AddTravelDetailRes?.Segments[0][0]?.Mile : 'no data'}</li>
                                </ul>
                            </div>
                            <div className='button-process procced-chnage-space'>
                                <button type='button' className='button-pro'>
                                    <Link onClick={() => travelDetailsHandlerFun()}>Proceed</Link>
                                </button>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default AddTravelDetails