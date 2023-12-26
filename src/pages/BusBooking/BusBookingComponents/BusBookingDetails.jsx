import React, { useEffect, useState } from 'react'
import { SvgIcon } from '../../../constent/SvgIcons'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { calculateAge, durationWithTwoTime, filterTime } from '../../../utils/FlightUtils'
import moment from 'moment'
import { APIRequest, ApiUrl } from '../../../utils/api'
import { ipAddress } from '../atom/atom'
import { useRecoilValue } from 'recoil'
import { toast } from 'react-toastify'
import Loader from '../../../components/Feature/Loader'

const BusBookingDetails = ({ setIdComponent }) => {
    const busDetails = useSelector(state => state.buses.busDetails);
    const AllPassenger = useSelector(state => state.buses.AllPassenger);
    const selectedSeat = useSelector(state => state.buses.selectedSeat)
    const TraceId = useSelector(state => state.buses.TraceId);
    const [isLoading, setisLoading] = useState(false);
    const IpAddress = useRecoilValue(ipAddress)

    function getDateFunc(date) {
        const formattedDate = moment(date).format('DD MMM, YYYY');
        return formattedDate
    }


    const BusBook = () => {
        let setIsLeadPax = false
        const PassengerData = AllPassenger?.map((item, index) => {
            let data = item.userData;
            let Title = data?.Gender === 'Male' ? 'Mr' : 'Ms'
            let Gender = data?.Gender === 'Male' ? 1 : 2
            let IsLeadPax = (calculateAge(data?.Age) > 12 && setIsLeadPax === false) ? (true, setIsLeadPax = true) : false
            return {
                ...data,
                Title: Title,
                Gender: Gender,
                LeadPassenger: IsLeadPax,
                Seat: item?.seat,
                Age: calculateAge(data?.Age)
            }
        });
        setisLoading(true)
        let config = {
            method: 'post',
            url: ApiUrl?.busBook,
            body: {
                "EndUserIp": IpAddress,
                "ResultIndex": busDetails?.ResultIndex,
                "TraceId": TraceId,
                "BoardingPointId": 1,
                "DroppingPointId": 1,
                "Passenger": PassengerData
            }
        }
        console.log(config);
        APIRequest(
            config,
            res => {
                console.log(res, '===============busGetBoardingPointDetails')
                setisLoading(false)
                setIdComponent(6)
            },
            err => {
                console.log(err, '====================== err hhh booking')
                setisLoading(false)
                toast.error(err?.message)
            }
        )
    }


    const BusBlock = () => {
        let setIsLeadPax = false
        const PassengerData = AllPassenger?.map((item, index) => {
            let data = item.userData;
            let Title = data?.Gender === 'Male' ? 'Mr' : 'Ms'
            let Gender = data?.Gender === 'Male' ? 1 : 2
            let IsLeadPax = (calculateAge(data?.Age) > 12 && setIsLeadPax === false) ? (true, setIsLeadPax = true) : false
            return {
                ...data,
                Title: Title,
                Gender: Gender,
                LeadPassenger: IsLeadPax,
                Seat: item?.seat,
                Age: calculateAge(data?.Age)
            }
        });
        setisLoading(true)
        let config = {
            method: 'post',
            url: ApiUrl?.busBlock,
            body: {
                "EndUserIp": IpAddress,
                "ResultIndex": busDetails?.ResultIndex,
                "TraceId": TraceId,
                "BoardingPointId": 1,
                "DroppingPointId": 1,
                "Passenger": PassengerData
            }
        }
        console.log(config);
        APIRequest(
            config,
            res => {
                console.log(res, '===============busGetBoardingPointDetails')
                BusBook()
            },
            err => {
                console.log(err, '====================== err hhh booking')
                setisLoading(false)
                toast.error(err?.message)
            }
        )
    }

    const Submit = () => {
        // setIdComponent(5)
        BusBlock()
    }


    console.log(busDetails, 'busDetails');

    return (
        <div className='Booking-Details-main'>
            <h3 className='add-travel-detail-title'>Booking Details</h3>
            <div className='booking-details-inr-dl'>
                <div className='booking-detail-list-dl'>
                    {/* row 01 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.durationIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Duration</h3>
                            <p>{durationWithTwoTime(busDetails?.ArrivalTime, busDetails?.DepartureTime)}</p>
                        </div>
                    </div>
                    {/* row 02 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.PassengerIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Passenger</h3>
                            <p>{selectedSeat?.length}</p>
                        </div>
                    </div>
                    {/* row 03 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.TransportIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Transport</h3>
                            <p>{busDetails?.TravelName}</p>
                        </div>
                    </div>
                    {/* row 03 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.TransportIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Boarding Points Details</h3>
                            <p>{busDetails?.BoardingPointsDetails[0]?.CityPointLocation}</p>
                            <p>{filterTime(busDetails?.BoardingPointsDetails[0].CityPointTime)}</p>
                        </div>
                    </div>
                    {/* row 03 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.TransportIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Dropping Points Details</h3>
                            <p>{busDetails?.DroppingPointsDetails[0]?.CityPointLocation}</p>
                            <p>{filterTime(busDetails?.DroppingPointsDetails[0]?.CityPointTime)}</p>
                        </div>
                    </div>


                    {/* row 05 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.DateofTravelIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Date of Travel</h3>
                            <p>{getDateFunc(busDetails.DepartureTime)} - {getDateFunc(busDetails.ArrivalTime)}</p>
                        </div>
                    </div>
                </div>
                <div className='booking-detail-list-dl-rt'>
                    <h3 className='mt-20 mb-0'>Payment Summary</h3>
                    <div className='list-of-summary'>
                        <div className='list-of-summary-inr'>
                            <div>
                                <h3>Hat’s Package</h3>
                                <p>{selectedSeat?.length} x @{(busDetails.BusPrice.PublishedPrice * 1.05)?.toFixed(2)}</p>
                            </div>
                            <div>
                                <p>{SvgIcon?.indiaRupe} {((busDetails.BusPrice.PublishedPrice * 1.05) * selectedSeat?.length).toFixed(2)}</p>
                            </div>
                        </div>

                        <div className='list-of-summary-inr02'>
                            <div>
                                <h3>Subtotal</h3>
                                {/* <h3>Service charge</h3> */}
                                <h3>Discount</h3>
                            </div>
                            <div>
                                <p>{SvgIcon?.indiaRupe} {((busDetails.BusPrice.PublishedPrice * 1.05) * selectedSeat?.length).toFixed(2)}</p>
                                {/* <p>{SvgIcon?.indiaRupe} 30</p> */}
                                <p>{SvgIcon?.indiaRupe} {(((busDetails.BusPrice.PublishedPrice * 1.05) * selectedSeat?.length) - (busDetails.BusPrice.PublishedPrice * selectedSeat?.length)).toFixed(2)}</p>
                            </div>
                        </div>

                        <div className='list-of-summary-inr02 border-0'>
                            <div>
                                <h3>Total</h3>
                            </div>
                            <div>
                                <p>{SvgIcon?.indiaRupe} {(busDetails.BusPrice.PublishedPrice * selectedSeat?.length).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='button-process procced-chnage-space'>
                <button type='button' className='button-pro'>
                    <Link onClick={() => Submit()}>Proceed</Link>
                </button>
            </div>
            <Loader isLoading={isLoading} />
        </div>
    )
}

export default BusBookingDetails