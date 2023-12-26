import React, { useEffect, useState } from 'react'
import { SvgIcon } from '../../../constent/SvgIcons'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
    adultsQuantity1, apiData,
    childrenQuantity1, infantsQuantity1,
    ipAddressSave, FlightInvoiceNo
} from '../atom/atom'
import { useSelector } from 'react-redux'
import { ConvertToTime } from '../../../utils/FlightUtils'
import moment from 'moment'
import { toast } from 'react-toastify'
import { APIRequest, ApiUrl } from '../../../utils/api'
import Loader from '../../../components/Feature/Loader'

const BookingDetails = ({ setIdComponent }) => {
    const ResultIndex = useSelector(state => state.flights.ResultIndex);
    const FlightDetails = useSelector((state) => state.flights.FlightDetails)
    const AllPassenger = useSelector((state) => state.flights.AllPassenger)
    const adultsQuantity = useRecoilValue(adultsQuantity1)
    const childrenQuantity = useRecoilValue(childrenQuantity1)
    const infantsQuantity = useRecoilValue(infantsQuantity1)
    const ipAddress = useRecoilValue(ipAddressSave)
    const saveResponseData = useRecoilValue(apiData)
    const [InvoiceNo, setInvoiceNo] = useRecoilState(FlightInvoiceNo)
    const [isLoading, setIsLoading] = useState(false)


    function getDateFunc(date) {
        const formattedDate = moment(date).format('DD MMM, YYYY');
        return formattedDate
    }


    // Flight ticket api
    const SendRequest2 = (type) => {
        console.log(FlightDetails[type].Fare);
        let setIsLeadPax = false
        const PassengerData = AllPassenger?.map((item, index) => {
            let data = item.userData;
            let PaxType = item.label.includes("Adult") ? 1 : item.label.includes("Child") ? 2 : item.label.includes("Infant") ? 3 : null;
            let Title = data?.Gender === 'Male' ? 'Mr' : 'Ms'
            let Gender = data?.Gender === 'Male' ? 1 : 2
            let IsLeadPax = (item.label.includes("Adult") && setIsLeadPax === false) ? (true, setIsLeadPax = true) : false
            return {
                ...data,
                Fare: {
                    BaseFare: FlightDetails[type].Fare.BaseFare,
                    Tax: FlightDetails[type].Fare.Tax,
                    YQTax: FlightDetails[type].Fare.YQTax,
                    AdditionalTxnFeeOfrd: FlightDetails[type].Fare.AdditionalTxnFeeOfrd,
                    AdditionalTxnFeePub: FlightDetails[type].Fare.AdditionalTxnFeePub,
                    OtherCharges: FlightDetails[type].Fare.OtherCharges,
                },
                Title: Title,
                Gender: Gender,
                PaxType: PaxType,
                IsLeadPax: IsLeadPax,
                FFAirlineCode: null,
                FFNumber: "",
                GSTCompanyAddress: "",
                GSTCompanyContactNumber: "",
                GSTCompanyName: "",
                GSTNumber: "",
                GSTCompanyEmail: "",
                CountryCode: "IN",
                CountryName: "India",
                Nationality: "IN",
            }
        });
        setIsLoading(true)
        let config = {
            method: 'post',
            url: ApiUrl?.flightTicket,
            body: {
                "EndUserIp": ipAddress,
                "TraceId": saveResponseData?.Response?.TraceId,
                "ResultIndex": ResultIndex[type],
                "Passengers": PassengerData,
                "PreferredCurrency": null,
                "AgentReferenceNo": "sonam1234567890",

            }
        }
        console.log(config, 'config');
        APIRequest(
            config,
            res => {
                console.log(res, '====================== res Ticket')
                setIsLoading(false)
                setInvoiceNo(res?.invoiceNo)
                setIdComponent(7)
            },
            err => {
                console.log(err, '====================== err hhh Ticket')
                setIsLoading(false)
                toast.error(err?.message)
            }
        )
    }
    const SendRequest3 = (BookingId, PNR) => {
        setIsLoading(true)
        let config = {
            method: 'post',
            url: ApiUrl?.flightTicket,
            body: {
                "EndUserIp": ipAddress,
                "TraceId": saveResponseData?.Response?.TraceId,
                "PNR": PNR,
                "BookingId": BookingId
            }
        }
        console.log(config, 'config');
        APIRequest(
            config,
            res => {
                console.log(res, '====================== res Ticket')
                setIsLoading(false)
                setInvoiceNo(res?.invoiceNo)
                setIdComponent(7)
            },
            err => {
                console.log(err, '====================== err hhh Ticket')
                setIsLoading(false)
                toast.error(err?.message)
            }
        )
    }

    const Send = (type) => {
        setTimeout(() => {
            SendRequest3(type)
        }, 6000);
    }

    // Flight book api
    const SendRequest = (type) => {
        console.log(FlightDetails[type].Fare);
        let setIsLeadPax = false
        const PassengerData = AllPassenger?.map((item, index) => {
            let data = item.userData;
            let PaxType = item.label.includes("Adult") ? 1 : item.label.includes("Child") ? 2 : item.label.includes("Infant") ? 3 : null;
            let Title = data?.Gender === 'Male' ? 'Mr' : 'Ms'
            let Gender = data?.Gender === 'Male' ? 1 : 2
            let IsLeadPax = (item.label.includes("Adult") && setIsLeadPax === false) ? (true, setIsLeadPax = true) : false
            return {
                ...data,
                Fare: {
                    Currency: FlightDetails[type].Fare.Currency,
                    BaseFare: FlightDetails[type].Fare.BaseFare,
                    Tax: FlightDetails[type].Fare.Tax,
                    YQTax: FlightDetails[type].Fare.YQTax,
                    AdditionalTxnFeeOfrd: FlightDetails[type].Fare.AdditionalTxnFeeOfrd,
                    AdditionalTxnFeePub: FlightDetails[type].Fare.AdditionalTxnFeePub,
                    OtherCharges: FlightDetails[type].Fare.OtherCharges,
                    PublishedFare: FlightDetails[type].Fare.PublishedFare,
                    OfferedFare: FlightDetails[type].Fare.OfferedFare,
                    TdsOnCommission: FlightDetails[type].Fare.TdsOnCommission,
                    TdsOnPLB: FlightDetails[type].Fare.TdsOnPLB,
                    TdsOnIncentive: FlightDetails[type].Fare.TdsOnIncentive,
                    ServiceFee: FlightDetails[type].Fare.ServiceFee,
                },
                Title: Title,
                Gender: Gender,
                PaxType: PaxType,
                IsLeadPax: IsLeadPax,
                FFAirlineCode: null,
                FFNumber: "",
                GSTCompanyAddress: "",
                GSTCompanyContactNumber: "",
                GSTCompanyName: "",
                GSTNumber: "",
                GSTCompanyEmail: "",
                CountryCode: "IN",
                CountryName: "India",
                Nationality: "IN",
            }
        });

        setIsLoading(true)
        let config = {
            method: 'post',
            url: ApiUrl?.flightBook,
            body: {
                "EndUserIp": ipAddress,
                "TraceId": saveResponseData?.Response?.TraceId,
                "ResultIndex": ResultIndex[type],
                "Passengers": PassengerData
            }
        }
        console.log(config, 'config');
        APIRequest(
            config,
            res => {
                console.log(res, '====================== res booking')
                SendRequest3(res?.data?.Response?.Response?.BookingId, res?.data?.Response?.Response?.PNR)
            },
            err => {
                console.log(err, '====================== err hhh booking')
                setIsLoading(false)
                toast.error(err?.message)
            }
        )
    }


    const Submit = () => {
        console.log(AllPassenger, FlightDetails, ResultIndex, 'AllPassenger');
        if (FlightDetails?.departure?.ResultIndex && FlightDetails?.departure?.IsLCC === true) {
            SendRequest2('departure')
        }
        if (FlightDetails?.departure?.ResultIndex && FlightDetails?.departure?.IsLCC === false) {
            SendRequest('departure')
        }
        if (FlightDetails?.return?.ResultIndex && FlightDetails?.return?.IsLCC === true) {
            SendRequest2('return')
        }
        if (FlightDetails?.return?.ResultIndex && FlightDetails?.return?.IsLCC === false) {
            SendRequest('return')
        }
        // if (ResultIndex?.departure) {
        //     SendRequest('departure')
        // }
        // if (ResultIndex?.return) {
        //     SendRequest('return')
        // }
    }



    console.log(FlightDetails, 'FlightDetails');
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
                            <p>{ConvertToTime(FlightDetails?.departure?.Segments[0][0]?.Duration)} {FlightDetails?.return?.Segments[0][0]?.Duration ? ` -- ${ConvertToTime(FlightDetails?.return?.Segments[0][0]?.Duration)}` : null} </p>
                        </div>
                    </div>
                    {/* row 02 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.PassengerIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Passenger</h3>
                            <p>
                                {adultsQuantity ? adultsQuantity + ' Adult’s ' : null}
                                {childrenQuantity ? ', ' + childrenQuantity + ' Children’s ' : null}
                                {infantsQuantity ? ', ' + infantsQuantity + ' Infant’s ' : null}
                            </p>
                        </div>
                    </div>
                    {/* row 03 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.TransportIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Transport</h3>
                            <p>
                                {`${FlightDetails?.departure?.Segments[0][0]?.Airline?.AirlineName} , `}
                                {FlightDetails?.departure?.Segments[0][0]?.CabinClass === 2 ? 'Economy' : FlightDetails?.departure?.Segments[0][0]?.CabinClass === 3 ? 'Premium Economy' : FlightDetails?.departure?.Segments[0][0]?.CabinClass === 4 ? 'Business' : FlightDetails?.departure?.Segments[0][0]?.CabinClass === 5 ? 'Premium Business' : FlightDetails?.departure?.Segments[0][0]?.CabinClass === 6 ? 'First Class' : null}
                            </p>
                        </div>
                    </div>

                    {/* row 04 */}
                    {/* <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.HotelIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Hotel</h3>
                            <p>J.W Marriott, N. Delhi</p>
                        </div>
                    </div> */}
                    {/* row 05 */}
                    <div className='list-of-item'>
                        <div className='list-of-image'>
                            {SvgIcon?.DateofTravelIcon}
                        </div>
                        <div className='list-of-content'>
                            <h3>Date of Travel</h3>
                            <p>{getDateFunc(FlightDetails?.departure?.Segments[0][0]?.StopPointArrivalTime)} {FlightDetails?.return?.Segments[0][0]?.StopPointArrivalTime ? ` -- ${getDateFunc(FlightDetails?.return?.Segments[0][0]?.StopPointArrivalTime)}` : null}</p>
                        </div>
                    </div>
                </div>
                <div className='booking-detail-list-dl-rt'>
                    {/* <h3>Payment Summary</h3> */}
                    {/* <div className='input-add-promo'>
                        <input type="text" name="promo" id="promo" />
                        <button className='promo-button'>Add Promo</button>
                    </div> */}
                    <h3 className='mt-20 mb-0'>Payment Summary</h3>
                    <div className='list-of-summary'>
                        <div className='list-of-summary-inr'>
                            <div>
                                <h3>Hat’s Package</h3>
                                <p>{adultsQuantity + childrenQuantity + infantsQuantity}
                                    x @{FlightDetails?.return?.Fare.BaseFare ?
                                        FlightDetails?.departure?.Fare.BaseFare + FlightDetails?.return?.Fare.BaseFare :
                                        FlightDetails?.departure?.Fare.BaseFare
                                    }</p>
                            </div>
                            <div>
                                <p>{SvgIcon?.indiaRupe} {
                                    FlightDetails?.return?.Fare.BaseFare ?
                                        (adultsQuantity + childrenQuantity + infantsQuantity) * (FlightDetails?.departure?.Fare.BaseFare + FlightDetails?.return?.Fare.BaseFare) :
                                        (adultsQuantity + childrenQuantity + infantsQuantity) * FlightDetails?.departure?.Fare.BaseFare
                                }</p>
                            </div>
                        </div>

                        <div className='list-of-summary-inr02'>
                            <div>
                                <h3>Subtotal</h3>
                                <h3>Service charge</h3>
                                <h3>Other Charges</h3>
                            </div>
                            <div>
                                <p>{SvgIcon?.indiaRupe} {
                                    FlightDetails?.return?.Fare.BaseFare ?
                                        (adultsQuantity + childrenQuantity + infantsQuantity) * (FlightDetails?.departure?.Fare.BaseFare + FlightDetails?.return?.Fare.BaseFare) :
                                        (adultsQuantity + childrenQuantity + infantsQuantity) * FlightDetails?.departure?.Fare.BaseFare
                                }
                                </p>
                                <p>{SvgIcon?.indiaRupe} {
                                    FlightDetails?.return?.Fare.Tax ?
                                        (adultsQuantity + childrenQuantity + infantsQuantity) * (FlightDetails?.departure?.Fare.Tax + FlightDetails?.return?.Fare.Tax) :
                                        (adultsQuantity + childrenQuantity + infantsQuantity) * FlightDetails?.departure?.Fare.Tax
                                }
                                </p>
                                <p>
                                    {SvgIcon?.indiaRupe}
                                    {
                                        FlightDetails?.return?.Fare.PublishedFare ?
                                            (adultsQuantity + childrenQuantity + infantsQuantity) * ((FlightDetails?.departure?.Fare.PublishedFare + FlightDetails?.return?.Fare.PublishedFare) - ((FlightDetails?.departure?.Fare.BaseFare + FlightDetails?.departure?.Fare.Tax) + (FlightDetails?.return?.Fare.BaseFare + FlightDetails?.return?.Fare.Tax))).toFixed(2)
                                            :
                                            (adultsQuantity + childrenQuantity + infantsQuantity) * (FlightDetails?.departure?.Fare.PublishedFare - (FlightDetails?.departure?.Fare.BaseFare + FlightDetails?.departure?.Fare.Tax)).toFixed(2)
                                    }
                                </p>
                            </div>
                        </div>
                        <div className='list-of-summary-inr02 border-0'>
                            <div>
                                <h3>Total</h3>
                            </div>
                            <div>
                                <p>{SvgIcon?.indiaRupe} {
                                    FlightDetails?.return?.Fare.PublishedFare ?
                                        ((adultsQuantity + childrenQuantity + infantsQuantity) * (FlightDetails?.departure?.Fare.PublishedFare + FlightDetails?.return?.Fare.PublishedFare)).toFixed(2)
                                        :
                                        ((adultsQuantity + childrenQuantity + infantsQuantity) * FlightDetails?.departure?.Fare.PublishedFare).toFixed(2)
                                }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='button-process procced-chnage-space'>
                <button type='button' className='button-pro'>
                    <Link onClick={() => Submit()}>Proceed</Link>
                    {/* <Link onClick={() => setIdComponent(7)}>Proceed</Link> */}
                </button>
            </div>
            <Loader isLoading={isLoading} />
        </div>
    )
}

export default BookingDetails