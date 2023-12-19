import React, { useEffect, useState } from 'react'
import { image } from '../../../constent/image'
import { SvgIcon } from '../../../constent/SvgIcons'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { FlightSelectedDetails, apiData, apiSingalData, ipAddressSave } from '../atom/atom'
import { APIRequest, ApiUrl } from '../../../utils/api'
import { toast } from 'react-toastify'
import Loader from '../../../components/Feature/Loader'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { setFlightDetails } from '../../../app/slice/FlightSlice'
import { ConvertToTime } from '../../../utils/FlightUtils'

const AddTravelDetails = ({ setIdComponent }) => {
    const dispatch = useDispatch()
    const ResultIndex = useSelector(state => state.flights.ResultIndex);
    const FlightDetails = useSelector(state => state.flights.FlightDetails);
    const [AddTravelDetailRes, setAddTravelDetailRes] = useState([])
    const setApiSingalData = useRecoilValue(apiSingalData);
    const saveResponseData = useRecoilValue(apiData)
    const FlightSelected = useRecoilValue(FlightSelectedDetails)
    const ipAddress = useRecoilValue(ipAddressSave)
    const [isLoading, setIsLoading] = useState(true)
    const [resError, setResError] = useState({})

    // // setIdComponent(4)
    const travelDetailsHandlerFun = () => {
        setIdComponent(4)
    }


    const SendRequest = (type) => {
        setIsLoading(true)
        let config = {
            method: 'post',
            url: ApiUrl?.fareQuoteSearch,
            body: {
                "EndUserIp": ipAddress,
                "TraceId": saveResponseData?.Response?.TraceId,
                "ResultIndex": ResultIndex[type]
            }
        }
        console.log(config);
        APIRequest(
            config,
            res => {
                console.log(res, '====================== res booking')
                setAddTravelDetailRes(res?.data?.Response?.Results)
                dispatch(setFlightDetails({ [type]: res?.data?.Response?.Results }))
                setIsLoading(false)
                // setIdComponent(4)
            },
            err => {
                console.log(err, '====================== err hhh booking')
                setIsLoading(false)
                toast.error(err?.message)
            }
        )
    }
    const SendRequest1 = (type) => {
        setIsLoading(true)
        let config = {
            method: 'post',
            url: ApiUrl?.fareRuleSearch,
            body: {
                "EndUserIp": ipAddress,
                "TraceId": saveResponseData?.Response?.TraceId,
                "ResultIndex": ResultIndex[type]
            }
        }
        console.log(config);
        APIRequest(
            config,
            res => {
                console.log(res, '====================== res booking')
                setIsLoading(false)
            },
            err => {
                console.log(err, '====================== err hhh booking')
                setIsLoading(false)
                toast.error(err?.message)
            }
        )
    }




    useEffect(() => {
        if (ResultIndex?.departure) {
            SendRequest('departure')
            SendRequest1('departure')
        } else {
            dispatch(setFlightDetails({ departure: null }))
        }
        if (ResultIndex?.return) {
            SendRequest('return')
            SendRequest1('return')
        } else {
            dispatch(setFlightDetails({ return: null }))
        }
    }, [])

    // filterTime
    function filterTime(time) {
        // Parse the date and time using Moment.js
        const startdateTime = moment(time);

        // Format to display only the time in 12-hour format
        const startformattedTime = startdateTime.format('h:mm A');

        return startformattedTime; // Output: 4:13 PM
    }

    function getDateFunc(date) {
        const formattedDate = moment(date).format('ddd, DD MMM');
        return formattedDate
    }

    return (
        <div className='add-travel-detail'>
            {
                isLoading ? <Loader isLoading={isLoading} />
                    :
                    <>
                        <h3 className='add-travel-detail-title'>Flight details</h3>
                        {FlightDetails?.departure ?
                            <>
                                <div className='main-bx-add-travel'>
                                    <div className='Discounted-price-bx'>
                                        <p>Discounted price at {SvgIcon?.indiaRupeGreen} {FlightDetails?.departure?.Fare?.PublishedFare} </p>
                                    </div>
                                    <div className='add-travel-details-bx'>
                                        <div className='add-travel-bx'>
                                            <div className='servcie-image-bx'>
                                                <h3 className='flightName'>{FlightDetails?.departure?.Segments[0][0]?.Airline?.AirlineName}</h3>
                                            </div>
                                            <p>
                                                {FlightDetails?.departure?.Segments[0][0]?.Airline?.AirlineCode}
                                                -
                                                {FlightDetails?.departure?.Segments[0][0]?.Airline?.FlightNumber}
                                            </p>
                                        </div>
                                        <div className='add-travel-bx'>
                                            <h5>
                                                {FlightDetails?.departure?.Segments[0][0]?.Origin?.Airport?.CityName}
                                                -
                                                {FlightDetails?.departure?.Segments[0][0]?.Origin?.Airport?.AirportCode}
                                            </h5>
                                            <h5>{filterTime(FlightDetails?.departure?.Segments[0][0]?.Origin?.DepTime)}</h5>
                                            <p>{getDateFunc(FlightDetails?.departure?.Segments[0][0]?.Origin?.DepTime)}</p>
                                            <p>
                                                (T-{FlightDetails?.departure?.Segments[0][0]?.Origin?.Airport?.Terminal})
                                                -
                                                {FlightDetails?.departure?.Segments[0][0]?.Origin?.Airport?.AirportName}
                                            </p>
                                        </div>
                                        <div className='add-travel-bx'>
                                            <div className='contentLine'> {ConvertToTime(FlightDetails?.departure?.Segments[0][0]?.Duration)}</div>
                                        </div>
                                        <div className='add-travel-bx'>
                                            <h5>
                                                {FlightDetails?.departure?.Segments[0][0]?.Destination?.Airport?.CityName}
                                                -
                                                {FlightDetails?.departure?.Segments[0][0]?.Destination?.Airport?.AirportCode}
                                            </h5>
                                            <h5>{filterTime(FlightDetails?.departure?.Segments[0][0]?.Destination?.ArrTime)}</h5>
                                            <p>{getDateFunc(FlightDetails?.departure?.Segments[0][0]?.Destination?.ArrTime)}</p>
                                            <p>(T-{FlightDetails?.departure?.Segments[0][0]?.Destination?.Airport?.Terminal})
                                                -
                                                {FlightDetails?.departure?.Segments[0][0]?.Destination?.Airport?.AirportName}
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
                                            <li>{FlightDetails?.departure?.MiniFareRules[0][1]?.Details ? FlightDetails?.departure?.MiniFareRules[0][1]?.Details : 'no data'}</li>
                                            <li>{FlightDetails?.departure?.Segments[0][0]?.Baggage ? FlightDetails?.departure?.Segments[0][0]?.Baggage : 'no data'}</li>
                                            <li>{FlightDetails?.departure?.Segments[0][0]?.CabinBaggage ? FlightDetails?.departure?.Segments[0][0]?.CabinBaggage : 'no data'}</li>
                                            <li>{FlightDetails?.departure?.Segments[0][0]?.Mile ? FlightDetails?.departure?.Segments[0][0]?.Mile : 'no data'}</li>
                                        </ul>
                                    </div>

                                </div>
                            </> :
                            null}
                        {FlightDetails?.return ?
                            <>
                                <div className='main-bx-add-travel mt-3'>
                                    <div className='Discounted-price-bx'>
                                        <p>Discounted price at {SvgIcon?.indiaRupeGreen} {FlightDetails?.return?.Fare?.PublishedFare} </p>
                                    </div>
                                    <div className='add-travel-details-bx'>
                                        <div className='add-travel-bx'>
                                            <div className='servcie-image-bx'>
                                                <h3 className='flightName'>{FlightDetails?.return?.Segments[0][0]?.Airline?.AirlineName}</h3>
                                            </div>
                                            <p>
                                                {FlightDetails?.return?.Segments[0][0]?.Airline?.AirlineCode}
                                                -
                                                {FlightDetails?.return?.Segments[0][0]?.Airline?.FlightNumber}
                                            </p>
                                        </div>
                                        <div className='add-travel-bx'>
                                            <h5>
                                                {FlightDetails?.return?.Segments[0][0]?.Origin?.Airport?.CityName}
                                                -
                                                {FlightDetails?.return?.Segments[0][0]?.Origin?.Airport?.AirportCode}
                                            </h5>
                                            <h5>{filterTime(FlightDetails?.return?.Segments[0][0]?.Origin?.DepTime)}</h5>
                                            <p>{getDateFunc(FlightDetails?.return?.Segments[0][0]?.Origin?.DepTime)}</p>
                                            <p>
                                                (T-{FlightDetails?.return?.Segments[0][0]?.Origin?.Airport?.Terminal})
                                                -
                                                {FlightDetails?.return?.Segments[0][0]?.Origin?.Airport?.AirportName}
                                            </p>
                                        </div>
                                        <div className='add-travel-bx'>
                                            <div className='contentLine'> {ConvertToTime(FlightDetails?.return?.Segments[0][0]?.Duration)}</div>
                                        </div>
                                        <div className='add-travel-bx'>
                                            <h5>
                                                {FlightDetails?.return?.Segments[0][0]?.Destination?.Airport?.CityName}
                                                -
                                                {FlightDetails?.return?.Segments[0][0]?.Destination?.Airport?.AirportCode}
                                            </h5>
                                            <h5>{filterTime(FlightDetails?.return?.Segments[0][0]?.Destination?.ArrTime)}</h5>
                                            <p>{getDateFunc(FlightDetails?.return?.Segments[0][0]?.Destination?.ArrTime)}</p>
                                            <p>(T-{FlightDetails?.return?.Segments[0][0]?.Destination?.Airport?.Terminal})
                                                -
                                                {FlightDetails?.return?.Segments[0][0]?.Destination?.Airport?.AirportName}
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
                                            <li>{FlightDetails?.return?.MiniFareRules[0][1]?.Details ? FlightDetails?.return?.MiniFareRules[0][1]?.Details : 'no data'}</li>
                                            <li>{FlightDetails?.return?.Segments[0][0]?.Baggage ? FlightDetails?.return?.Segments[0][0]?.Baggage : 'no data'}</li>
                                            <li>{FlightDetails?.return?.Segments[0][0]?.CabinBaggage ? FlightDetails?.return?.Segments[0][0]?.CabinBaggage : 'no data'}</li>
                                            <li>{FlightDetails?.return?.Segments[0][0]?.Mile ? FlightDetails?.return?.Segments[0][0]?.Mile : 'no data'}</li>
                                        </ul>
                                    </div>
                                </div>
                            </> :
                            null}
                        <div className='button-process procced-chnage-space'>
                            <button type='button' className='button-pro'>
                                <Link onClick={() => travelDetailsHandlerFun()}>Proceed</Link>
                            </button>
                        </div>
                    </>
            }
        </div>
    )
}

export default AddTravelDetails