import React, { useEffect, useState } from 'react'
import TicketButton from '../../../components/Button/TicketButton'
import { image } from '../../../constent/image'
import { Checkbox, FormControlLabel } from '@mui/material'
import DatePickerCustom, { DatePickerCustom2 } from '../../../components/Input/DatePicker'
import { SvgIcon } from '../../../constent/SvgIcons'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CustomModal from '../../../components/Modal/CustomModal'
import { APIRequest, ApiUrl } from '../../../utils/api'
import Loader from '../../../components/Feature/Loader'
import { toast } from 'react-toastify'
import { useRecoilState, useRecoilValue } from 'recoil'
import { FlightListData, adultsQuantity1, apiData, childrenQuantity1, infantsQuantity1, ipAddressSave, travelClassValue } from '../atom/atom'
import FlightBookingCustomeModal from '../modal/FlightBookingCustomeModal'
import moment from 'moment'
import { setFlightReturn, setFlights } from '../../../app/slice/FlightSlice'
import { useDispatch } from 'react-redux'
const SaveBillOption = ['Armed forces', 'Student', 'Senior Citizen']

const FlightsBookingForm = ({ setIdComponent }) => {
    const dispatch = useDispatch();
    const [apiDatas, setApidata] = useRecoilState(apiData)
    const [FlightList, setFlightList] = useState(FlightListData)
    const [Tab, setTab] = useState(1);
    const [ipAddress, setIpAddress] = useRecoilState(ipAddressSave);
    const [isLoading, setIsLoading] = useState(false)
    const [saveBill, setsaveBill] = useState('')
    const [isNonStop, setisNonStop] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [returnDate, setReturntDate] = useState(new Date());
    const [fromValue, setFromValue] = React.useState(null);
    const [toValue, setToValue] = React.useState(null);
    const adultsQuantity = useRecoilValue(adultsQuantity1)
    const childrenQuantity = useRecoilValue(childrenQuantity1)
    const infantsQuantity = useRecoilValue(infantsQuantity1)
    const saveClass = useRecoilValue(travelClassValue)

    // get ip address value
    const getIpAddressFun = async () => {
        const response = await fetch(
            `https://api.db-ip.com/v2/free/self`
        );
        const data = await response.json();
        setIpAddress(data?.ipAddress);
    }
    useEffect(() => {
        getIpAddressFun()
    }, [])

    const defaultProps = {
        options: top100Films,
        getOptionLabel: (option) => option.title,
    };

    // Swap the values between fromValue and toValue
    const exchangeValues = () => {
        setFromValue(toValue);
        setToValue(fromValue);
    };

    const bookingHandlerFun = () => {
        setIsLoading(true)
        let Segments;
        if (Tab === 2) {
            Segments = [
                {
                    "Origin": fromValue?.title,
                    "Destination": toValue?.title,
                    "FlightCabinClass": saveClass?.value,
                    "PreferredDepartureTime": moment(startDate).startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
                    "PreferredArrivalTime": moment(startDate).add(1, 'hour').startOf('day').format('YYYY-MM-DDTHH:mm:ss')
                },
                {
                    "Origin": toValue?.title,
                    "Destination": fromValue?.title,
                    "FlightCabinClass": saveClass?.value,
                    "PreferredDepartureTime": moment(returnDate).startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
                    "PreferredArrivalTime": moment(returnDate).add(1, 'hour').startOf('day').format('YYYY-MM-DDTHH:mm:ss')
                }
            ]
        } else {
            Segments = [
                {
                    "Origin": toValue?.title,
                    "Destination": fromValue?.title,
                    "FlightCabinClass": saveClass?.value,
                    "PreferredDepartureTime": moment(returnDate).startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
                    "PreferredArrivalTime": moment(returnDate).add(1, 'hour').startOf('day').format('YYYY-MM-DDTHH:mm:ss')
                }
            ]
        }

        let config = {
            method: 'post',
            url: ApiUrl?.bookingSearch,
            url: "https://api.ebhuktan.com/api/flight/ticket/booking/search",

            body: {
                "EndUserIp": ipAddress,
                "AdultCount": adultsQuantity,
                "ChildCount": childrenQuantity,
                "InfantCount": infantsQuantity,
                "DirectFlight": "false",
                "OneStopFlight": isNonStop,
                "JourneyType": Tab,
                "PreferredAirlines": null,
                'Segments': Segments,
                "Sources": null
            },

        }
        console.log(config, '==========');
        APIRequest(
            config,
            res => {
                console.log(res, '====================== res booking dd')
                setIsLoading(false)
                setApidata(res?.data)
                if (res?.data?.Response?.Results?.length > 1) {
                    console.log('if');
                    dispatch(setFlights(res?.data?.Response?.Results[0]))
                    dispatch(setFlightReturn(res?.data?.Response?.Results[1]))
                } else {
                    console.log('else');
                    dispatch(setFlights(res?.data?.Response?.Results[0]))
                    dispatch(setFlightReturn([]))
                }
                setIdComponent(2)
            },
            err => {
                console.log(err, '====================== err booking')
                toast.error(err?.message)
                setIsLoading(false)
            }
        )
    }

    return (
        <>
            <div className='flight-ticket-outer mb-5 mt-0'>
                <div className='card-box'>
                    <div className='flight-ticket-inner py-3'>
                        <div className='ticket-button-group'>
                            <TicketButton lable={'One Way'} isActive={Tab === 1 ? true : false} onClick={() => setTab(1)} />
                            <TicketButton lable={'Round Trip'} isActive={Tab === 2 ? true : false} onClick={() => setTab(2)} />
                        </div>
                        <div>
                            <div className='flight-input-from-to my-4'>
                                <div className='w-45' style={{ width: '45%' }}>
                                    <p className='ticket-gray-text text-left'>From</p>
                                    <p className='ticket-gray-bold-text'>{fromValue?.title}</p>
                                    {/* <input type='text' name='from' value={'Delhi'} className='ticket-gray-text' /> */}
                                    <Autocomplete
                                        {...defaultProps}
                                        id="disable-close-on-select"
                                        clearOnEscape
                                        value={fromValue}
                                        onChange={(event, newValue) => {
                                            setFromValue(newValue); // Update the selected option when an option is selected
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="From" variant="standard" />
                                        )}
                                    />
                                </div>
                                <div style={{ width: '10%' }} onClick={() => exchangeValues()}>
                                    <img src={image.SyncArrow} alt="Fingerprint" className={`Image-SyncArrow `} />
                                </div>
                                <div style={{ width: '45%' }}>
                                    <p className='ticket-gray-text text-right'>To</p>
                                    <p className='ticket-gray-bold-text text-right'>{toValue?.title}</p>
                                    {/* <input type='text' name='from' value={'Mumbai'} className='ticket-gray-text text-right' /> */}
                                    <Autocomplete
                                        {...defaultProps}
                                        id="disable-close-on-select"
                                        onChange={(event, newValue) => {
                                            setToValue(newValue); // Update the selected option when an option is selected
                                        }}
                                        clearOnEscape
                                        value={toValue}
                                        renderInput={(params) => (
                                            <TextField {...params} label="To" variant="standard" />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='flight-input-from-to my-4 gap-10'>
                                <div className='flex-fill'>
                                    <p className='ticket-gray-text text-left'>Departure Date</p>
                                    <div className='date-picker-parent border-underline pt-1'>
                                        <DatePickerCustom setStartDate={setStartDate} startDate={startDate} />
                                    </div>
                                </div>

                                <div className='flex-fill'>
                                    <p className='ticket-gray-text text-right'>Return Date</p>
                                    <div className='date-picker-parent right border-underline pt-1'>
                                        <DatePickerCustom2 setReturntDate={setReturntDate} returnDate={returnDate} disabled={Tab === 1 ? 'disabled' : null} className={Tab === 1 ? 'disabled-flight' : null} />
                                    </div>
                                </div>
                            </div>
                            <div className='flight-input-from-to my-2'>
                                <FlightBookingCustomeModal />
                            </div>
                            <div className='ticket-savebill my-4'>
                                <p className='ticket-gray-text save-bill-title pb-2'>Special Fares (optional)</p>
                                <div className='buttonBtn'>
                                    {SaveBillOption.map((item, i) =>
                                        <button key={`savebillbutton${i}`}
                                            onClick={() => setsaveBill(item)}
                                            className={saveBill === item ? 'active-btn' : 'btn-sucess'}
                                        >{item}</button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <FormControlLabel control={<Checkbox onChange={(e) => setisNonStop(e.target.checked)} />} label="Show non stop flights only" />
                            </div>
                            <TicketButton lable={'Search Flights'} isActive={true} onClick={bookingHandlerFun} isCircular={true} />
                        </div>
                    </div>
                </div>
            </div>
            <>
                <Loader isLoading={isLoading} />
            </>
        </>


    )
}

export default FlightsBookingForm;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'Andhra Pradesh', year: 1994 },
    { title: 'DEL', year: 1994 },
    { title: 'Arunachal Pradesh', year: 1972 },
    { title: 'BOM', year: 1972 },
    { title: 'Assam', year: 1974 },
    { title: 'Chhattisgarh', year: 2008 },
    { title: 'Goa', year: 1957 },
    { title: "Gujarat", year: 1993 },
    { title: 'Maharashtra', year: 1994 },
]